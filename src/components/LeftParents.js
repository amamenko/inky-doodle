import React, { useEffect } from "react";
import axios from "axios";
import InkyDoodle from "./InkyDoodle";

const LeftParents = (props) => {
  const {
    parentInkyDoodles,
    leftTreeLeftParent,
    changeLeftTreeLeftParent,
    leftTreeRightParent,
    changeLeftTreeRightParent,
    changeLeftGen2,
    changeLeftGen2Loading,
  } = props;

  const parentInkyDoodlesQuery = `
    query {
        inkyDoodleCollection(where: {generation_in: 2, parents_contains_all: [${
          leftTreeLeftParent.label
            ? JSON.stringify(leftTreeLeftParent.label)
            : null
        }, ${
    leftTreeRightParent.label ? JSON.stringify(leftTreeRightParent.label) : null
  }]}) {
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

  useEffect(() => {
    const getGen2Function = async () => {
      changeLeftGen2Loading(true);

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
          changeLeftGen2Loading(false);

          if (errors) {
            console.error(errors);
          }

          changeLeftGen2(data.inkyDoodleCollection.items[0]);
        });

      return response;
    };

    if (leftTreeLeftParent) {
      if (leftTreeRightParent) {
        if (leftTreeLeftParent.name && leftTreeRightParent.name) {
          if (
            JSON.stringify(leftTreeLeftParent.name) ===
            JSON.stringify(leftTreeRightParent.name)
          ) {
            changeLeftGen2(leftTreeLeftParent);
          } else {
            getGen2Function().then((res) => res);
          }
        } else {
          if (
            JSON.stringify(leftTreeLeftParent.label) ===
            JSON.stringify(leftTreeRightParent.label)
          ) {
            changeLeftGen2(leftTreeLeftParent);
          } else {
            getGen2Function().then((res) => res);
          }
        }
      }
    }
  }, [
    leftTreeLeftParent,
    leftTreeRightParent,
    parentInkyDoodlesQuery,
    changeLeftGen2,
    changeLeftGen2Loading,
  ]);

  return (
    <>
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        leftTreeLeftParent={leftTreeLeftParent}
        changeLeftTreeLeftParent={changeLeftTreeLeftParent}
        leftLeft
      />
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        leftTreeRightParent={leftTreeRightParent}
        changeLeftTreeRightParent={changeLeftTreeRightParent}
        leftRight
      />
    </>
  );
};

export default LeftParents;
