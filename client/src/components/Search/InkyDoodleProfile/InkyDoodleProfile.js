import React, { useEffect, useState, useMemo } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import { StyledProfileTopContainer } from "./styled/StyledProfileTopContainer";
import { StyledProfileBackContainer } from "./styled/StyledProfileBackContainer";
import { StyledImageContainer } from "./styled/StyledImageContainer";
import { StyledProfileDescriptionContainer } from "./styled/StyledProfileDescriptionContainer";
import { StyledSectionContainer } from "./styled/StyledSectionContainer";
import { StyledDescriptionLine } from "./styled/StyledDescriptionLine";
import { StyledBackToSearchButton } from "./styled/StyledBackToSearchButton";
import { StyledProfileMenuXButton } from "./styled/StyleProfileMenuXButton";
import ChildrenSection from "./components/ChildrenSection";
import ParentsSection from "./components/ParentsSection";
import InstagramSection from "./components/InstagramSection";
import "./ProfileSliderStyles.css";

const InkyDoodleProfile = (props) => {
  const { inkyDoodleSelected, changeInkyDoodleSelected, inkyDoodleResult } =
    props;

  const [inkyDoodleStack, changeInkyDoodleStack] = useState([
    { main: "", parents: [], children: [] },
  ]);
  const [currentInkyDoodleIndex, changeCurrentInkyDoodleIndex] = useState(0);
  const [currentInkyDoodle, changeCurrentInkyDoodle] = useState("");
  const [currentInkyDoodleParents, changeCurrentInkyDoodleParents] = useState(
    []
  );
  const [currentInkyDoodleChildren, changeCurrentInkyDoodleChildren] = useState(
    []
  );

  useMemo(() => {
    if (inkyDoodleStack) {
      if (inkyDoodleStack[currentInkyDoodleIndex]) {
        if (inkyDoodleStack[currentInkyDoodleIndex].main) {
          changeCurrentInkyDoodle(inkyDoodleStack[currentInkyDoodleIndex].main);
        }

        if (inkyDoodleStack[currentInkyDoodleIndex].parents) {
          changeCurrentInkyDoodleParents(
            inkyDoodleStack[currentInkyDoodleIndex].parents.sort(
              (a, b) => a.number - b.number
            )
          );
        }

        if (inkyDoodleStack[currentInkyDoodleIndex].children) {
          changeCurrentInkyDoodleChildren(
            inkyDoodleStack[currentInkyDoodleIndex].children.sort(
              (a, b) => a.number - b.number
            )
          );
        }
      }
    }
  }, [inkyDoodleStack, currentInkyDoodleIndex]);

  useEffect(() => {
    if (inkyDoodleResult) {
      if (!inkyDoodleStack[0].main) {
        changeInkyDoodleStack([
          { main: inkyDoodleResult, parents: [], children: [] },
        ]);
      }
    }
  }, [inkyDoodleResult, inkyDoodleStack, currentInkyDoodleIndex]);

  useEffect(() => {
    const queryContentfulFunction = (gen1) => {
      const inkyDoodleParentsChildrenQuery = `
            query {
                inkyDoodleCollection(limit: 2000, order: [generation_ASC, name_ASC], where: { 
                    OR: [
                            ${
                              gen1
                                ? ""
                                : `{ name_contains: "${currentInkyDoodle.parents[0]}" },
                            { name_contains: "${currentInkyDoodle.parents[1]}" },`
                            }
                            { parents_contains_some: "${
                              currentInkyDoodle.name
                            }"}
                        ], wave_not_in: [3, 4, 5]
                }) {
                    items   {
                    generation
                    instagram
                    name
                    wave
                    image {
                        url
                    } 
                    number
                    parents
                }
            }
        }
        `;

      axios({
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
        method: "post",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
        data: {
          query: inkyDoodleParentsChildrenQuery,
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
                const copyArr = [...inkyDoodleStack];
                let inkyDoodleObj = copyArr[currentInkyDoodleIndex];

                if (inkyDoodleObj) {
                  if (gen1) {
                    inkyDoodleObj.parents = [
                      currentInkyDoodle,
                      currentInkyDoodle,
                    ];
                    inkyDoodleObj.children = data.inkyDoodleCollection.items;
                  } else {
                    inkyDoodleObj.parents =
                      data.inkyDoodleCollection.items.slice(0, 2);
                    inkyDoodleObj.children =
                      data.inkyDoodleCollection.items.slice(2);
                  }

                  changeInkyDoodleStack(copyArr);
                }
              }
            }
          }
        });
    };

    let gen1;

    if (currentInkyDoodle) {
      if (currentInkyDoodle.parents) {
        if (currentInkyDoodleParents.length === 0) {
          queryContentfulFunction(gen1);
        }
      } else {
        if (currentInkyDoodleParents.length === 0) {
          gen1 = true;

          queryContentfulFunction(gen1);
        }
      }
    }
  }, [
    currentInkyDoodle,
    currentInkyDoodleIndex,
    currentInkyDoodleParents.length,
    inkyDoodleStack,
  ]);

  const handleMenuClose = () => {
    changeInkyDoodleStack([{ main: "", parents: [], children: [] }]);
    changeInkyDoodleSelected("");
    changeCurrentInkyDoodleIndex(0);
    changeCurrentInkyDoodle("");
    changeCurrentInkyDoodleParents([]);
    changeCurrentInkyDoodleChildren([]);
  };

  const handleParentOrChildClick = (entry) => {
    changeCurrentInkyDoodleIndex(currentInkyDoodleIndex + 1);
    changeInkyDoodleStack([
      ...inkyDoodleStack,
      { main: entry, parents: [], children: [] },
    ]);
    changeCurrentInkyDoodleParents([]);
    changeCurrentInkyDoodleChildren([]);
  };

  const handleBackProfileClick = () => {
    const copyArr = [...inkyDoodleStack];
    copyArr.pop();
    changeInkyDoodleStack(copyArr);

    changeCurrentInkyDoodleIndex(currentInkyDoodleIndex - 1);
    changeCurrentInkyDoodleParents([]);
    changeCurrentInkyDoodleChildren([]);
  };

  if (inkyDoodleResult && currentInkyDoodle) {
    return (
      <Menu
        disableAutoFocus
        isOpen={inkyDoodleSelected ? true : false}
        onClose={handleMenuClose}
        customCrossIcon={false}
        right
      >
        <StyledProfileMenuXButton
          type="button"
          className="nes-btn is-error"
          onClick={handleMenuClose}
        >
          X
        </StyledProfileMenuXButton>
        {currentInkyDoodleIndex > 0 ? (
          <StyledProfileBackContainer
            className="nes-pointer nes-container"
            onClick={handleBackProfileClick}
          >
            <span>{"<"}</span>
            <p>
              Back to {inkyDoodleStack[currentInkyDoodleIndex - 1].main.name}
            </p>
          </StyledProfileBackContainer>
        ) : null}
        <ParentsSection
          currentInkyDoodle={currentInkyDoodle}
          currentInkyDoodleParents={currentInkyDoodleParents}
          handleParentOrChildClick={handleParentOrChildClick}
        />
        <StyledProfileTopContainer>
          <h2>{currentInkyDoodle.name}</h2>
          <StyledImageContainer>
            <img
              src={currentInkyDoodle.image.url}
              alt={`${currentInkyDoodle.name}`}
            />
          </StyledImageContainer>
          <h2>{"#" + currentInkyDoodle.number}</h2>
        </StyledProfileTopContainer>
        <StyledProfileDescriptionContainer>
          <StyledSectionContainer>
            <span className="profile_header_section">
              <p>Description</p>
            </span>
            <div className="profile_desciption_content">
              <StyledDescriptionLine>
                <p>
                  <b>Generation:</b>
                </p>
                <p>{" " + currentInkyDoodle.generation}</p>
              </StyledDescriptionLine>
              <StyledDescriptionLine>
                <p>
                  <b>Wave:</b>
                </p>
                <p>
                  {currentInkyDoodle.wave ? " " + currentInkyDoodle.wave : " 1"}
                </p>
              </StyledDescriptionLine>
            </div>
          </StyledSectionContainer>
          {currentInkyDoodleChildren.length > 0 ? (
            <ChildrenSection
              currentInkyDoodle={currentInkyDoodle}
              currentInkyDoodleChildren={currentInkyDoodleChildren}
              handleParentOrChildClick={handleParentOrChildClick}
            />
          ) : null}
          <InstagramSection
            currentInkyDoodle={currentInkyDoodle}
            currentInkyDoodleChildren={currentInkyDoodleChildren}
          />
          <StyledBackToSearchButton
            className="nes-btn"
            onClick={handleMenuClose}
          >
            Back to Search
          </StyledBackToSearchButton>
        </StyledProfileDescriptionContainer>
      </Menu>
    );
  } else {
    return null;
  }
};

export default InkyDoodleProfile;
