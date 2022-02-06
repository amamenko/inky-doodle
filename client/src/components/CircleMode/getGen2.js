import axios from "axios";

export const getGen2 = async (parent1, parent2) => {
  const parentInkyDoodlesQuery = `
    query {
        inkyDoodleCollection(where: {generation_in: 2, wave_not_in: [3, 4, 5, 6], parents_contains_all: [${JSON.stringify(
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
