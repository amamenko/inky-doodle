import axios from "axios";

export const getGen3 = async (parent1, parent2) => {
  const gen3InkyDoodlesQuery = `
          query {
              inkyDoodleCollection(where: {wave_not_in: [3, 4, 5, 6], parents_contains_all: [${JSON.stringify(
                parent1.name
              )}, ${JSON.stringify(parent2.name)}]}) {
                  items {
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

  const response = await axios({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
    data: {
      query: gen3InkyDoodlesQuery,
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
