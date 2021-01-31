import React, { useEffect } from "react";
import axios from "axios";
import InkyDoodle from "./InkyDoodle";

const RightParents = (props) => {
  const {
    parentInkyDoodles,
    rightTreeLeftParent,
    changeRightTreeLeftParent,
    rightTreeRightParent,
    changeRightTreeRightParent,
    changeRightGen2,
    changeRightGen2Loading,
  } = props;

  const parentInkyDoodlesQuery = `
    query {
        inkyDoodleCollection(where: {generation_in: 2, parents_contains_all: [${
          rightTreeLeftParent.label
            ? JSON.stringify(rightTreeLeftParent.label)
            : null
        }, ${
    rightTreeRightParent.label
      ? JSON.stringify(rightTreeRightParent.label)
      : null
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
      changeRightGen2Loading(true);

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
          changeRightGen2Loading(false);

          if (errors) {
            console.error(errors);
          }

          changeRightGen2(data.inkyDoodleCollection.items[0]);
        });

      return response;
    };

    if (rightTreeLeftParent) {
      if (rightTreeRightParent) {
        if (rightTreeLeftParent.name && rightTreeRightParent.name) {
          if (
            JSON.stringify(rightTreeLeftParent.name) ===
            JSON.stringify(rightTreeRightParent.name)
          ) {
            changeRightGen2(rightTreeLeftParent);
          } else {
            getGen2Function().then((res) => res);
          }
        } else {
          if (
            JSON.stringify(rightTreeLeftParent.label) ===
            JSON.stringify(rightTreeRightParent.label)
          ) {
            changeRightGen2(rightTreeLeftParent);
          } else {
            getGen2Function().then((res) => res);
          }
        }
      }
    }
  }, [
    rightTreeLeftParent,
    rightTreeRightParent,
    parentInkyDoodlesQuery,
    changeRightGen2,
    changeRightGen2Loading,
  ]);

  return (
    <>
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        rightTreeLeftParent={rightTreeLeftParent}
        changeRightTreeLeftParent={changeRightTreeLeftParent}
        rightLeft
      />
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        rightTreeRightParent={rightTreeRightParent}
        changeRightTreeRightParent={changeRightTreeRightParent}
        rightRight
      />
    </>
  );
};

export default RightParents;
