const express = require("express");
const app = express();
const axios = require("axios");
const sharp = require("sharp");
const fs = require("fs");
const pngToJpeg = require("png-to-jpeg");
const Instagram = require("instagram-web-api");
const cron = require("node-cron");

require("dotenv").config();

const port = process.env.PORT || 4000;

// Upload new Inky Doodle to Instagram every day at 4:00 PM
cron.schedule("0 16 * * *", () => {
  const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
  });

  client.login().then(() => {
    client
      .getPhotosByUsername({ username: process.env.INSTAGRAM_USERNAME })
      .then(
        (res) =>
          res.user.edge_owner_to_timeline_media.edges.map(
            (item) => item.node.edge_media_to_caption.edges[0].node.text
          )[0]
      )
      .then((mostRecent) => Number(mostRecent.split(" - ")[0]))
      .then((latestNumber) => {
        const updatedNumber = latestNumber + 1;

        const inkyDoodleQuery = `
        query {
            inkyDoodleCollection(where: {number: ${updatedNumber}}) {
                items   {
                number
                generation
                name
                parents
                image {
                    url
                }
            }
        }
    }
`;

        axios({
          url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
          },
          data: {
            query: inkyDoodleQuery,
          },
        })
          .then((res) => res.data)
          .then(({ data, errors }) => {
            if (errors) {
              console.error(errors);
            }

            const updatedInkyDoodle = data.inkyDoodleCollection.items[0];

            if (updatedInkyDoodle) {
              const updatedCaption = `${updatedNumber} - ${
                updatedInkyDoodle.name
              }\n${
                updatedInkyDoodle.parents
                  ? updatedInkyDoodle.parents.length > 0
                    ? updatedInkyDoodle.parents
                        .map((parent) => "#" + parent)
                        .join(" + ") + " \n"
                    : ""
                  : ""
              }#inkydoodle #gen${updatedInkyDoodle.generation}`;

              sharp(updatedInkyDoodle.image.url)
                .resize(405, 405)
                .toBuffer()
                .then((buffer) => {
                  pngToJpeg({ quality: 90 })(buffer).then(async (output) => {
                    fs.writeFileSync(`./${updatedInkyDoodle.name}.jpg`, output);

                    // Upload converted and resized JPG to Instagram feed
                    await client
                      .uploadPhoto({
                        photo: `${updatedInkyDoodle.name}.jpg`,
                        caption: updatedCaption,
                        post: "feed",
                      })
                      .then(({ media }) => {
                        console.log(
                          `https://www.instagram.com/p/${media.code}/`
                        );

                        // Remove Local JPG File
                        fs.unlinkSync(`${updatedInkyDoodle.name}.jpg`);
                      });
                  });
                });
            }
          });
      });
  });
});

app.listen(4000, () => {
  console.log(`Listening on port ${port}...`);
});
