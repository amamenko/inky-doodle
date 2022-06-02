const express = require("express");
const app = express();
const axios = require("axios");
const contentful = require("contentful-management");
const fs = require("fs");
const Jimp = require("jimp");
const Instagram = require("./instagram-web-api/index");
const FileCookieStore = require("tough-cookie-filestore2");
const cron = require("node-cron");
const imaps = require("imap-simple");
const _ = require("lodash");
const simpleParser = require("mailparser").simpleParser;
const dayjs = require("dayjs");

require("dotenv").config();

const port = process.env.PORT || 4000;

// Upload new Inky Doodle to Instagram every day at 4:00 PM
cron.schedule("59 15 * * *", async () => {
  const instagramLoginFunction = async () => {
    // Persist cookies after Instagram client log in
    const cookieStore = new FileCookieStore("./cookies.json");

    const client = new Instagram(
      {
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
        cookieStore,
      },
      {
        language: "en-US",
      }
    );

    const instagramPostPictureFunction = async () => {
      await client
        .getPhotosByUsername({ username: process.env.INSTAGRAM_USERNAME })
        .then((res) => {
          const allCaptions = res.user.edge_owner_to_timeline_media.edges.map(
            (item) => item.node.edge_media_to_caption.edges[0]
          );

          const allCaptionsExisting = allCaptions.filter((caption) => caption);

          return {
            mostRecent:
              allCaptions[allCaptions.length - allCaptionsExisting.length].node
                .text,
            offset: allCaptions.length - allCaptionsExisting.length,
          };
        })
        .then(({ mostRecent, offset }) => {
          return {
            latestNumber: Number(mostRecent.split(" - ")[0]),
            offset: offset,
          };
        })
        .then(({ latestNumber, offset }) => {
          const updatedNumber = latestNumber + (offset + 1);

          const inkyDoodleQuery = `
                            query {
                                inkyDoodleCollection(where: {number: ${updatedNumber}}) {
                                  items   {
                                    sys {
                                      id
                                    }
                                    number
                                    generation
                                    name
                                    wave
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
            .then(async ({ data, errors }) => {
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
                }#inkydoodle #gen${updatedInkyDoodle.generation}${
                  updatedInkyDoodle.wave
                    ? ` #wave${updatedInkyDoodle.wave}`
                    : ""
                }`;

                Jimp.read(updatedInkyDoodle.image.url)
                  .then((lenna) => {
                    return lenna
                      .resize(405, 405, Jimp.RESIZE_NEAREST_NEIGHBOR)
                      .quality(100)
                      .write(`./${updatedInkyDoodle.name}.jpg`, async () => {
                        // Upload converted and resized JPG to Instagram feed
                        await client
                          .uploadPhoto({
                            photo: `${updatedInkyDoodle.name}.jpg`,
                            caption: updatedCaption,
                            post: "feed",
                          })
                          .then(async ({ media }) => {
                            console.log(
                              `https://www.instagram.com/p/${media.code}/`
                            );

                            await client.addComment({
                              mediaId: media.id,
                              text: "#nftcollectors #nftcollectibles #dibujo #dibujodigital #pixel #pixelart #digitalart #cute #artist #instadaily #artdaily #pixelartist #dailyart #nfts #nft #16bitart #8bitart #8bit #32bit #arteespanol #artebrasil #gatoslindos #gatosdeinstagram #nycart",
                            });

                            const contentfulClient = contentful.createClient({
                              accessToken:
                                process.env.CONTENTFUL_MANAGEMENT_TOKEN,
                            });

                            contentfulClient
                              .getSpace(process.env.CONTENTFUL_SPACE_ID)
                              .then((space) => {
                                space
                                  .getEnvironment("master")
                                  .then((environment) => {
                                    environment
                                      .getEntry(updatedInkyDoodle.sys.id)
                                      .then((entry) => {
                                        entry.fields.instagram = {
                                          "en-US": {
                                            url: `https://www.instagram.com/p/${media.code}/`,
                                            date: dayjs().format(
                                              "MMMM D, YYYY"
                                            ),
                                          },
                                        };

                                        entry.update().then(() => {
                                          environment
                                            .getEntry(updatedInkyDoodle.sys.id)
                                            .then((updatedEntry) => {
                                              updatedEntry.publish();

                                              console.log(
                                                `Entry updated successfully and published. New updated entry Instagram link is ${updatedEntry.fields.instagram["en-US"].url}`
                                              );
                                            });
                                        });
                                      });
                                  });
                              });

                            // Remove Local JPG File
                            fs.unlinkSync(`${updatedInkyDoodle.name}.jpg`);
                          });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
        });
    };

    try {
      console.log("Logging in...");

      await client.login();

      console.log("Login successful!");

      const delayedInstagramPostFunction = async (timeout) => {
        setTimeout(async () => {
          await instagramPostPictureFunction();
        }, timeout);
      };

      await delayedInstagramPostFunction(50000);
    } catch (err) {
      console.log("Login failed!");

      const delayedLoginFunction = async (timeout) => {
        setTimeout(async () => {
          await client.login().then(() => instagramPostPictureFunction());
        }, timeout);
      };

      if (err.statusCode === 403 || err.statusCode === 429) {
        console.log("Throttled!");

        await delayedLoginFunction(60000);
      }

      console.log(err);

      // Instagram has thrown a checkpoint error
      if (err.error && err.error.message === "checkpoint_required") {
        const challengeUrl = err.error.checkpoint_url;

        await client.updateChallenge({ challengeUrl, choice: 1 });

        const emailConfig = {
          imap: {
            user: `${process.env.INKY_DOODLE_EMAIL}`,
            password: `${process.env.INKY_DOODLE_EMAIL_PASSWORD}`,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: {
              servername: "imap.gmail.com",
              rejectUnauthorized: false,
            },
            authTimeout: 30000,
          },
        };

        // Connect to email and solve Instagram challenge after delay
        const delayedEmailFunction = async (timeout) => {
          setTimeout(() => {
            imaps.connect(emailConfig).then(async (connection) => {
              return connection.openBox("INBOX").then(async () => {
                // Fetch emails from the last hour
                const delay = 1 * 3600 * 1000;
                let lastHour = new Date();
                lastHour.setTime(Date.now() - delay);
                lastHour = lastHour.toISOString();
                const searchCriteria = ["ALL", ["SINCE", lastHour]];
                const fetchOptions = {
                  bodies: [""],
                };
                return connection
                  .search(searchCriteria, fetchOptions)
                  .then((messages) => {
                    messages.forEach((item) => {
                      const all = _.find(item.parts, { which: "" });
                      const id = item.attributes.uid;
                      const idHeader = "Imap-Id: " + id + "\r\n";
                      simpleParser(idHeader + all.body, async (err, mail) => {
                        if (err) {
                          console.log(err);
                        }

                        console.log(mail.subject);

                        const answerCodeArr = mail.text
                          .split("\n")
                          .filter(
                            (item) =>
                              item && /^\S+$/.test(item) && !isNaN(Number(item))
                          );

                        if (mail.text.includes("Instagram")) {
                          if (answerCodeArr.length > 0) {
                            // Answer code must be kept as string type and not manipulated to a number type to preserve leading zeros
                            const answerCode = answerCodeArr[0];
                            console.log(answerCode);

                            await client.updateChallenge({
                              challengeUrl,
                              securityCode: answerCode,
                            });

                            console.log(
                              `Answered Instagram security challenge with answer code: ${answerCode}`
                            );

                            await client.login();

                            await instagramPostPictureFunction();
                          }
                        }
                      });
                    });
                  });
              });
            });
          }, timeout);
        };

        await delayedEmailFunction(40000);
      }

      // Delete stored cookies, if any, and log in again
      console.log("Logging in again and setting new cookie store");
      fs.unlinkSync("./cookies.json");
      const newCookieStore = new FileCookieStore("./cookies.json");

      const newClient = new Instagram(
        {
          username: process.env.INSTAGRAM_USERNAME,
          password: process.env.INSTAGRAM_PASSWORD,
          cookieStore: newCookieStore,
        },
        {
          language: "en-US",
        }
      );

      const delayedNewLoginFunction = async (timeout) => {
        setTimeout(async () => {
          console.log("Logging in again");
          await newClient
            .login()
            .then(() => instagramPostPictureFunction())
            .catch((err) => {
              console.log(err);
              console.log("Login failed again!");
            });
        }, timeout);
      };

      await delayedNewLoginFunction(10000);
    }
  };

  await instagramLoginFunction();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
