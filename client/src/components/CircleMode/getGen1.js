import axios from "axios";

export const getGen1 = async () => {
  const parentInkyDoodlesQuery = `
    query {
      inkyDoodleCollection(where: {generation_in: 1, wave_not_in: [3, 4, 5, 6]}) {
          items   {
          generation
          name
          wave
          image {
              url
          }
          color 
          number
        }
      }
    }
  `;

  const response = await axios({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
    data: {
      query: parentInkyDoodlesQuery,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then(({ data, errors }) => {
      if (errors) {
        console.error(errors);
      }

      return data.inkyDoodleCollection.items;
    });

  return response;
};
