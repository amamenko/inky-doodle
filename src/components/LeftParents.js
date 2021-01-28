import React, { useState, useEffect } from "react";
import axios from "axios";
import InkyDoodle from "./InkyDoodle";

const LeftParents = (props) => {
  const { parentInkyDoodles } = props;

  const [leftChild, changeLeftChild] = useState("");
  const [rightChild, changeRightChild] = useState("");

  const [secondGenChild, changeSecondGenChild] = useState({});

  const parentInkyDoodlesQuery = `
    query {
        inkyDoodleCollection(where: {generation_in: 2, parents_contains_all: [${leftChild.name}, ${rightChild.name}]}) {
            items {
                generation
                name
                parents
            }
        }
    }
`;

  useEffect(() => {
    if (leftChild) {
      if (rightChild) {
        axios({
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
          .then((res) => res.data)
          .then(({ data, errors }) => {
            if (errors) {
              console.error(errors);
            }

            changeSecondGenChild(data.inkyDoodleCollection.items);
          });
      }
    }
  }, [leftChild, rightChild, parentInkyDoodlesQuery]);

  return (
    <>
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        leftChild={leftChild}
        changeLeftChild={changeLeftChild}
      />
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        rightChild={leftChild}
        changeRightChild={changeLeftChild}
      />
    </>
  );
};

export default LeftParents;
