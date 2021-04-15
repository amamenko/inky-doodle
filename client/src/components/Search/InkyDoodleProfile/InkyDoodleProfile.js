import React, { useEffect, useState, useMemo } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import dayjs from "dayjs";
import { StyledProfileTopContainer } from "./styled/StyledProfileTopContainer";
import { StyledProfileBackContainer } from "./styled/StyledProfileBackContainer";
import { StyledImageContainer } from "./styled/StyledImageContainer";
import { StyledProfileDescriptionContainer } from "./styled/StyledProfileDescriptionContainer";
import { StyledParentsContainer } from "./styled/StyledParentsContainer";
import { StyledIndividualParentContainer } from "./styled/StyledIndividualParentContainer";
import { StyledSectionContainer } from "./styled/StyledSectionContainer";
import { StyledDescriptionLine } from "./styled/StyledDescriptionLine";
import { StyledInstagramLink } from "./styled/StyledInstagramLink";
import { StyledBackToSearchButton } from "./styled/StyledBackToSearchButton";
import { StyledChildrenContainer } from "./styled/StyledChildrenContainer";
import { StyledIndividualChildContainer } from "./styled/StyledIndividualChildContainer";
import { StyledChildrenOuterContainer } from "./styled/StyledChildrenOuterContainer";
import "./ProfileSliderStyles.css";

const InkyDoodleProfile = (props) => {
  const {
    inkyDoodleSelected,
    changeInkyDoodleSelected,
    inkyDoodleResult,
  } = props;

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
            inkyDoodleStack[currentInkyDoodleIndex].parents
          );
        }

        if (inkyDoodleStack[currentInkyDoodleIndex].children) {
          changeCurrentInkyDoodleChildren(
            inkyDoodleStack[currentInkyDoodleIndex].children
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
                        ]
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
                    inkyDoodleObj.parents = data.inkyDoodleCollection.items.slice(
                      0,
                      2
                    );
                    inkyDoodleObj.children = data.inkyDoodleCollection.items.slice(
                      2
                    );
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

  const handleInstagramPostClick = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener, noreferrer");
  };

  if (inkyDoodleResult && currentInkyDoodle) {
    return (
      <Menu
        disableAutoFocus
        isOpen={inkyDoodleSelected ? true : false}
        onClose={handleMenuClose}
        customCrossIcon={<p className="nes-pointer">X</p>}
        right
      >
        <StyledProfileTopContainer>
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
            <p>Description</p>
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
          </StyledSectionContainer>
          <StyledParentsContainer>
            <StyledIndividualParentContainer
              onClick={() =>
                handleParentOrChildClick(currentInkyDoodleParents[0])
              }
              className={
                currentInkyDoodle.generation > 1 ? "nes-pointer" : null
              }
              linked={currentInkyDoodle.generation > 1}
            >
              {currentInkyDoodleParents[0] ? (
                <>
                  <p>
                    <b>Parent 1:</b>
                  </p>
                  <p>{currentInkyDoodleParents[0].name}</p>
                  <img
                    src={currentInkyDoodleParents[0].image.url}
                    alt={currentInkyDoodleParents[0].name}
                  />
                  {currentInkyDoodle.generation > 1 ? (
                    <MdSubdirectoryArrowRight />
                  ) : null}
                </>
              ) : (
                <ClipLoader loading={true} size={40} />
              )}
            </StyledIndividualParentContainer>
            <StyledIndividualParentContainer
              onClick={() =>
                handleParentOrChildClick(currentInkyDoodleParents[1])
              }
              className={
                currentInkyDoodle.generation > 1 ? "nes-pointer" : null
              }
              linked={currentInkyDoodle.generation > 1}
            >
              {currentInkyDoodleParents[1] ? (
                <>
                  <p>
                    <b>Parent 2:</b>
                  </p>
                  <p>{currentInkyDoodleParents[1].name}</p>
                  <img
                    src={currentInkyDoodleParents[1].image.url}
                    alt={currentInkyDoodleParents[1].name}
                  />
                  {currentInkyDoodle.generation > 1 ? (
                    <MdSubdirectoryArrowRight />
                  ) : null}
                </>
              ) : (
                <ClipLoader loading={true} size={40} />
              )}
            </StyledIndividualParentContainer>
          </StyledParentsContainer>
          {currentInkyDoodleChildren.length > 0 ? (
            <StyledChildrenOuterContainer>
              <p>Children</p>
              <StyledChildrenContainer gen={currentInkyDoodle.generation}>
                {currentInkyDoodleChildren.map((child) => (
                  <StyledIndividualChildContainer
                    key={child.number}
                    className="nes-pointer"
                    onClick={() => handleParentOrChildClick(child)}
                  >
                    <p>{child.name}</p>
                    <img src={child.image.url} alt={child.name} />
                    {child.generation > 1 ? <MdSubdirectoryArrowRight /> : null}
                  </StyledIndividualChildContainer>
                ))}
              </StyledChildrenContainer>
            </StyledChildrenOuterContainer>
          ) : null}
          <StyledSectionContainer instagram>
            <p>Instagram</p>
            <StyledDescriptionLine>
              <p>
                <b>Posted:</b>
              </p>
              <p>{currentInkyDoodle.instagram ? "Yes" : "No"}</p>
            </StyledDescriptionLine>
            <StyledDescriptionLine>
              <p>
                <b>{currentInkyDoodle.instagram ? `Date:` : `Scheduled:`}</b>
              </p>
              <p>
                {currentInkyDoodle.instagram
                  ? `${currentInkyDoodle.instagram.date}`
                  : `${dayjs("February 7, 2021")
                      .add(currentInkyDoodle.number + 1, "day")
                      .format("MMMM D, YYYY")} `}
              </p>
            </StyledDescriptionLine>
            {currentInkyDoodle.instagram ? (
              <StyledInstagramLink
                className="nes-btn is-primary"
                onClick={(e) =>
                  handleInstagramPostClick(e, currentInkyDoodle.instagram.url)
                }
              >
                <p>View Post</p>
              </StyledInstagramLink>
            ) : null}
          </StyledSectionContainer>
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
