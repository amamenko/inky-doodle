import React, { useEffect } from "react";
import axios from "axios";
import InkyDoodle from "./InkyDoodle";

const RightParents = (props) => {
  const {
    parentInkyDoodles,
    rightTreeLeftParent,
    rightTreeRightParent,
    changeRightTreeLeftParent,
    changeRightTreeRightParent,
    changeRightGen2,
    changeRightGen2Loading,
    randomizing,
    changeRandomizing,
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

  useEffect(() => {
    if (rightTreeLeftParent || rightTreeRightParent) {
      const listenForMenu = setInterval(() => {
        [...document.getElementsByClassName("left_parents")].forEach((item) => {
          if (item) {
            if (item.childNodes) {
              if (item.childNodes[2]) {
                if (item.childNodes[2].firstChild) {
                  if (
                    item.childNodes[2].firstChild.classList.value.includes(
                      "MenuList"
                    ) ||
                    item.childNodes[2].firstChild.classList.value.includes(
                      "menu"
                    ) ||
                    item.childNodes[2].firstChild.classList.value.includes(
                      "css-1tci6j0"
                    )
                  ) {
                    item.childNodes[2].firstChild.childNodes.forEach((x) => {
                      if (
                        JSON.stringify(x.textContent) ===
                          JSON.stringify(rightTreeLeftParent.label) ||
                        JSON.stringify(x.textContent) ===
                          JSON.stringify(rightTreeRightParent.label)
                      ) {
                        const relevantParent = parentInkyDoodles.filter(
                          (parent) =>
                            JSON.stringify(x.textContent) ===
                            JSON.stringify(parent.name)
                        );

                        if (relevantParent) {
                          if (relevantParent.length > 0) {
                            x.style.backgroundColor = `${relevantParent[0].color}77`;
                          }
                        }
                      } else {
                        x.style.backgroundColor = "#FFF";
                      }
                    });
                  }
                }
              }
            }
          }
        });
      }, 100);

      return () => {
        clearInterval(listenForMenu);
      };
    }
  }, [rightTreeLeftParent, rightTreeRightParent, parentInkyDoodles]);

  return (
    <>
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        changeRightTreeLeftParent={changeRightTreeLeftParent}
        rightLeft
        rightTreeRightParent={rightTreeRightParent}
        rightTreeLeftParent={rightTreeLeftParent}
        randomizing={randomizing}
        changeRandomizing={changeRandomizing}
      />
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        changeRightTreeRightParent={changeRightTreeRightParent}
        rightRight
        rightTreeRightParent={rightTreeRightParent}
        rightTreeLeftParent={rightTreeLeftParent}
        randomizing={randomizing}
        changeRandomizing={changeRandomizing}
      />
    </>
  );
};

export default RightParents;
