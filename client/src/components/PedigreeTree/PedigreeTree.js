import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import InkyDoodle from "./InkyDoodle";
import LeftParents from "./LeftParents";
import RightParents from "./RightParents";
import InkyLogo from "../../images/inky.png";
import Select from "react-select";
import { StyledBackToHomeButton } from "../Home/styled/StyledBackToHomeButton";
import { ImHome3 } from "react-icons/im";
import { Link } from "react-router-dom";
import nesTheme from "react-select-nes-css-theme";
import "nes.css/css/nes.min.css";

const StyledPedigreeTreeContainer = styled.div`
  max-height: 100vh;
  max-width: 100vw;
`;

const StyledMainContainer = styled.div`
  font-family: "Press Start 2P";
  font-size: 1rem;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: ${(props) => (props.parentInkyDoodles ? "1.8rem" : "7vh")};
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  &:last-child {
    padding-bottom: 7vh;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    margin-top: ${(props) => (props.parentInkyDoodles ? "4rem" : "15vh")};
    padding-left: 0;
    padding-right: 0;
    &:last-child {
      padding-bottom: 15vh;
    }
  }
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 340px) {
    margin-top: ${(props) => (props.parentInkyDoodles ? "2rem" : "13vh")};
  }
  @media (min-width: 1025px) {
    margin-top: ${(props) => (props.parentInkyDoodles ? "3rem" : "7vh")};
  }
`;

const StyledParentsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const StyledNavLogo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
`;

const StyledAnchor = styled.a`
  height: 5vh;
  display: block;
  position: relative;
  width: 100px;
  margin-top: 1rem;
  margin-left: 1rem;
  @media (max-width: 330px) {
    margin-left: 0.5rem;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    margin-top: 0.5rem;
    margin-left: 0rem;
  }
`;

const StyledRandomizedDropdownContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  font-size: 2rem;
  margin-top: 1rem;
  margin-right: 1rem;
  @media (max-width: 330px) {
    width: 105px;
    margin-right: 0;
  }
  @media (min-width: 331px) {
    width: 105px;
  }

  @media (min-width: 1024px) {
    width: 175px;
  }

  @media (max-width: 750px) and (orientation: landscape) {
    margin-top: 0.5rem;
    width: 105px;
  }

  @media (max-width: 700px) and (orientation: landscape) {
    margin-top: 1rem;
  }

  @media (min-width: 751px) and (max-width: 1024px) and (orientation: landscape) {
    margin-top: 0.8rem;
    width: 110px;
  }
`;

const PedigreeTree = () => {
  const [parentInkyDoodles, changeParentInkyDoodles] = useState("");

  // Left Tree Parents (Gen 1)
  const [leftTreeLeftParent, changeLeftTreeLeftParent] = useState("");
  const [leftTreeRightParent, changeLeftTreeRightParent] = useState("");

  // Right Tree Parents (Gen 1)
  const [rightTreeLeftParent, changeRightTreeLeftParent] = useState("");
  const [rightTreeRightParent, changeRightTreeRightParent] = useState("");

  // Left Gen 2
  const [leftGen2, changeLeftGen2] = useState("");
  const [leftGen2Loading, changeLeftGen2Loading] = useState(false);

  // Right Gen 2
  const [rightGen2, changeRightGen2] = useState("");
  const [rightGen2Loading, changeRightGen2Loading] = useState(false);

  // Gen 3
  const [gen3, changeGen3] = useState("");
  const [gen3Loading, changeGen3Loading] = useState(false);

  const [randomizedSelection, changeRandomizedSelection] = useState("");
  const [randomizing, changeRandomizing] = useState(false);

  const parentInkyDoodlesQuery = `
        query {
            inkyDoodleCollection(where: {generation_in: 1}) {
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

  useEffect(() => {
    axios({
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
      method: "post",
      headers: {
        "Content-Type": "Application/json",
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

        if (data) {
          if (data.inkyDoodleCollection) {
            if (data.inkyDoodleCollection.items) {
              changeParentInkyDoodles(
                data.inkyDoodleCollection.items.sort(
                  (a, b) => a.number - b.number
                )
              );
            }
          }
        }
      });
  }, [parentInkyDoodlesQuery]);

  useEffect(() => {
    if (leftGen2 && rightGen2) {
      if (leftGen2.name && rightGen2.name) {
        if (leftGen2.name === rightGen2.name) {
          if (gen3) {
            if (gen3.name !== leftGen2.name) {
              changeGen3(leftGen2);
            }
          } else {
            changeGen3(leftGen2);
          }
        }
      } else {
        if (leftGen2.label && rightGen2.label) {
          if (leftGen2.label === rightGen2.label) {
            if (gen3) {
              if (gen3.name !== leftGen2.label) {
                changeGen3(leftGen2);
              }
            } else {
              changeGen3(leftGen2);
            }
          }
        }
      }
    }
  }, [gen3, leftGen2, rightGen2]);

  useEffect(() => {
    const getGen3Function = async (parent1, parent2) => {
      changeGen3Loading(true);

      const gen3InkyDoodlesQuery = `
        query {
            inkyDoodleCollection(where: {parents_contains_all: [${
              parent1
                ? parent1.name
                  ? JSON.stringify(parent1.name)
                  : parent1.label
                  ? JSON.stringify(parent1.label)
                  : null
                : leftGen2.name
                ? JSON.stringify(leftGen2.name)
                : leftGen2.label
                ? JSON.stringify(leftGen2.label)
                : null
            }, ${
        parent2
          ? parent2.name
            ? JSON.stringify(parent2.name)
            : parent2.label
            ? JSON.stringify(parent2.label)
            : null
          : rightGen2.name
          ? JSON.stringify(rightGen2.name)
          : rightGen2.label
          ? JSON.stringify(rightGen2.label)
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

      await axios({
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
        method: "post",
        headers: {
          "Content-Type": "Application/json",
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
          changeGen3Loading(false);
          if (errors) {
            console.error(errors);
          }

          if (data.inkyDoodleCollection.items[0]) {
            if (leftGen2 && rightGen2) {
              if (
                (leftGen2.name &&
                  rightGen2.name &&
                  leftGen2.name === rightGen2.name) ||
                (leftGen2.label &&
                  rightGen2.label &&
                  leftGen2.label === rightGen2.label)
              ) {
                changeGen3(leftGen2);
              } else {
                changeGen3(data.inkyDoodleCollection.items[0]);
              }
            }
          } else {
            if (
              leftTreeLeftParent &&
              leftTreeRightParent &&
              rightTreeLeftParent &&
              rightTreeRightParent
            ) {
              if (
                leftTreeLeftParent.label &&
                leftTreeRightParent.label &&
                rightTreeLeftParent.label &&
                rightTreeRightParent.label
              ) {
                const nameArr = [
                  leftTreeLeftParent.label,
                  leftTreeRightParent.label,
                  rightTreeLeftParent.label,
                  rightTreeRightParent.label,
                ];

                const uniqueNames = [...new Set(nameArr)];

                if (uniqueNames.length === 4) {
                  changeGen3("No Match");
                }
              }
            }
          }
        });
    };

    if (leftGen2) {
      if (rightGen2) {
        if (
          (leftGen2.name &&
            rightGen2.name &&
            leftGen2.name === rightGen2.name) ||
          (leftGen2.label &&
            rightGen2.label &&
            leftGen2.label === rightGen2.label)
        ) {
          changeGen3(leftGen2);
        } else {
          const firstGenArr = [
            leftTreeLeftParent,
            leftTreeRightParent,
            rightTreeLeftParent,
            rightTreeRightParent,
          ];

          const firstGenNames = firstGenArr.map((x) => x.label);

          let nameFrequencyObj = {};

          for (let i = 0; i < firstGenArr.length; i++) {
            if (nameFrequencyObj[firstGenArr[i].label]) {
              nameFrequencyObj[firstGenArr[i].label]++;
            } else {
              nameFrequencyObj[firstGenArr[i].label] = 1;
            }
          }

          for (let c in nameFrequencyObj) {
            if (nameFrequencyObj[c] >= 3) {
              changeGen3(
                firstGenArr[
                  firstGenNames.indexOf(
                    Object.keys(nameFrequencyObj).find(
                      (key) => nameFrequencyObj[key] === nameFrequencyObj[c]
                    )
                  )
                ]
              );

              return;
            } else if (
              nameFrequencyObj[c] === 2 &&
              Object.values(nameFrequencyObj).indexOf(2) ===
                Object.values(nameFrequencyObj).lastIndexOf(2)
            ) {
              const mostFreq = Object.keys(nameFrequencyObj).find(
                (key) => nameFrequencyObj[key] === nameFrequencyObj[c]
              );
              const remainingArr = Object.keys(nameFrequencyObj).filter(
                (x) => x !== mostFreq
              );

              const getGen2Function = async (parent1, parent2) => {
                const gen2InkyDoodlesQuery = `
              query {
                  inkyDoodleCollection(where: {generation_in: 2, parents_contains_all: [${JSON.stringify(
                    parent1
                  )}, ${JSON.stringify(parent2)}]}) {
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
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                  },
                  data: {
                    query: gen2InkyDoodlesQuery,
                  },
                })
                  .then((res) => {
                    return res.data;
                  })
                  .then(({ data, errors }) => {
                    if (errors) {
                      console.error(errors);
                    }

                    return data.inkyDoodleCollection.items[0];
                  });

                return response;
              };

              Promise.all(
                remainingArr.map(
                  async (item) => await getGen2Function(mostFreq, item)
                )
              ).then((res) => {
                getGen3Function(res[0], res[1]);
              });
            } else if (leftGen2.name && rightGen2.name) {
              if (
                JSON.stringify(leftGen2.name) === JSON.stringify(rightGen2.name)
              ) {
                changeGen3(leftGen2);
              } else {
                getGen3Function();
              }
            } else {
              if (leftGen2.label && rightGen2.label) {
                if (
                  JSON.stringify(leftGen2.label) ===
                  JSON.stringify(rightGen2.label)
                ) {
                  changeGen3(leftGen2);
                } else {
                  getGen3Function();
                }
              } else {
                getGen3Function();
              }
            }
          }
        }
      }
    }
  }, [
    leftGen2,
    rightGen2,
    leftTreeRightParent,
    leftTreeLeftParent,
    rightTreeRightParent,
    rightTreeLeftParent,
  ]);

  useEffect(() => {
    // In order to prevent iOS keyboard from opening on dropdown focus
    window.addEventListener("load", () => {
      const nesDropdowns = [...document.getElementsByTagName("INPUT")];
      if (nesDropdowns.length > 0) {
        nesDropdowns.forEach((item) => item.setAttribute("readonly", true));
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const nesDropdowns = [...document.getElementsByTagName("INPUT")];
      if (nesDropdowns.length > 0) {
        nesDropdowns.forEach((item) => item.setAttribute("readonly", true));
      }
    });
  }, []);

  useEffect(() => {
    if (randomizedSelection) {
      if (randomizedSelection.label) {
        changeLeftTreeLeftParent("");
        changeLeftTreeRightParent("");
        changeRightTreeLeftParent("");
        changeRightTreeRightParent("");
        changeRandomizing(true);

        const randomIndex = Math.floor(
          Math.random() * parentInkyDoodles.length
        );

        const newObj = {
          value: randomIndex,
          label: parentInkyDoodles[randomIndex].name,
          imageURL: parentInkyDoodles[randomIndex].image.url,
        };

        let secondRandomIndex = Math.floor(
          Math.random() * parentInkyDoodles.length
        );

        while (secondRandomIndex === randomIndex) {
          secondRandomIndex = Math.floor(
            Math.random() * parentInkyDoodles.length
          );
        }

        const secondNewObj = {
          value: secondRandomIndex,
          label: parentInkyDoodles[secondRandomIndex].name,
          imageURL: parentInkyDoodles[secondRandomIndex].image.url,
        };

        let thirdRandomIndex = Math.floor(
          Math.random() * parentInkyDoodles.length
        );

        while (
          thirdRandomIndex === randomIndex ||
          thirdRandomIndex === secondRandomIndex
        ) {
          thirdRandomIndex = Math.floor(
            Math.random() * parentInkyDoodles.length
          );
        }

        const thirdNewObj = {
          value: thirdRandomIndex,
          label: parentInkyDoodles[thirdRandomIndex].name,
          imageURL: parentInkyDoodles[thirdRandomIndex].image.url,
        };

        let fourthRandomIndex = Math.floor(
          Math.random() * parentInkyDoodles.length
        );

        while (
          fourthRandomIndex === randomIndex ||
          fourthRandomIndex === secondRandomIndex ||
          fourthRandomIndex === thirdRandomIndex
        ) {
          fourthRandomIndex = Math.floor(
            Math.random() * parentInkyDoodles.length
          );
        }

        const fourthNewObj = {
          value: fourthRandomIndex,
          label: parentInkyDoodles[fourthRandomIndex].name,
          imageURL: parentInkyDoodles[fourthRandomIndex].image.url,
        };

        if (randomizedSelection.label === "AAAA") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(newObj);
          changeRightTreeLeftParent(newObj);
          changeRightTreeRightParent(newObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "AAAB") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(newObj);
          changeRightTreeLeftParent(newObj);
          changeRightTreeRightParent(secondNewObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "AABB") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(newObj);
          changeRightTreeLeftParent(secondNewObj);
          changeRightTreeRightParent(secondNewObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "ABAB") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(secondNewObj);
          changeRightTreeLeftParent(newObj);
          changeRightTreeRightParent(secondNewObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "ABAC") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(secondNewObj);
          changeRightTreeLeftParent(newObj);
          changeRightTreeRightParent(thirdNewObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "AABC") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(newObj);
          changeRightTreeLeftParent(secondNewObj);
          changeRightTreeRightParent(thirdNewObj);
          changeRandomizedSelection("");
        } else if (randomizedSelection.label === "ABCD") {
          changeLeftTreeLeftParent(newObj);
          changeLeftTreeRightParent(secondNewObj);
          changeRightTreeLeftParent(thirdNewObj);
          changeRightTreeRightParent(fourthNewObj);
          changeGen3("No Match");
          changeRandomizedSelection("");
        } else {
          const selectionArr = [
            { value: 0, label: "AAAA" },
            { value: 1, label: "AAAB" },
            { value: 2, label: "AABB" },
            { value: 3, label: "ABAB" },
            { value: 4, label: "ABAC" },
            { value: 5, label: "AABC" },
            { value: 6, label: "ABCD" },
          ];

          const randomIndex = Math.floor(Math.random() * selectionArr.length);

          changeRandomizedSelection(selectionArr[randomIndex]);
        }
      }
    }
  }, [parentInkyDoodles, randomizedSelection]);

  return (
    <StyledPedigreeTreeContainer>
      <StyledAnchor href="/">
        <StyledNavLogo src={InkyLogo} alt="Inky Doodle Logo" />
      </StyledAnchor>
      <StyledRandomizedDropdownContainer>
        <Select
          className="randomizer_dropdown"
          styles={nesTheme}
          value={randomizedSelection}
          onChange={changeRandomizedSelection}
          isSearchable={false}
          placeholder={"Randomize"}
          options={[
            { value: 0, label: "AAAA" },
            { value: 1, label: "AAAB" },
            { value: 2, label: "AABB" },
            { value: 3, label: "ABAB" },
            { value: 4, label: "ABAC" },
            { value: 5, label: "AABC" },
            { value: 6, label: "ABCD" },
            { value: 7, label: "RANDOM" },
          ]}
        />
      </StyledRandomizedDropdownContainer>
      <Link to="/">
        <StyledBackToHomeButton
          tree
          type="button"
          className="nes-btn is-warning"
        >
          <ImHome3 />
          <p>Home</p>
        </StyledBackToHomeButton>
      </Link>
      <StyledMainContainer parentInkyDoodles={parentInkyDoodles}>
        <StyledParentsContainer>
          <LeftParents
            parentInkyDoodles={parentInkyDoodles}
            leftTreeLeftParent={leftTreeLeftParent}
            changeLeftTreeLeftParent={changeLeftTreeLeftParent}
            leftTreeRightParent={leftTreeRightParent}
            changeLeftTreeRightParent={changeLeftTreeRightParent}
            changeLeftGen2={changeLeftGen2}
            changeLeftGen2Loading={changeLeftGen2Loading}
            randomizing={randomizing}
            changeRandomizing={changeRandomizing}
          />
        </StyledParentsContainer>
        <StyledParentsContainer>
          <RightParents
            parentInkyDoodles={parentInkyDoodles}
            rightTreeLeftParent={rightTreeLeftParent}
            changeRightTreeLeftParent={changeRightTreeLeftParent}
            rightTreeRightParent={rightTreeRightParent}
            leftTreeLeftParent={leftTreeLeftParent}
            leftTreeRightParent={leftTreeRightParent}
            changeRightTreeRightParent={changeRightTreeRightParent}
            changeRightGen2={changeRightGen2}
            changeRightGen2Loading={changeRightGen2Loading}
            randomizing={randomizing}
            changeRandomizing={changeRandomizing}
          />
        </StyledParentsContainer>
      </StyledMainContainer>
      <StyledMainContainer>
        <StyledParentsContainer style={{ justifyContent: "space-around" }}>
          <InkyDoodle
            leftGen2={leftGen2}
            leftGen2Loading={leftGen2Loading}
            gen2Identifier={true}
          />
          <InkyDoodle
            rightGen2={rightGen2}
            rightGen2Loading={rightGen2Loading}
            gen2Identifier={true}
          />
        </StyledParentsContainer>
      </StyledMainContainer>
      <StyledMainContainer>
        <InkyDoodle
          gen3={gen3}
          gen3Loading={gen3Loading}
          gen3Identifier={true}
        />
      </StyledMainContainer>
    </StyledPedigreeTreeContainer>
  );
};

export default PedigreeTree;
