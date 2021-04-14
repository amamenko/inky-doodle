import React, { useEffect, useState, useMemo } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { MdSubdirectoryArrowRight, MdArrowBack } from "react-icons/md";
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
import "./ProfileSliderStyles.css";

const InkyDoodleProfile = (props) => {
  const {
    inkyDoodleSelected,
    changeInkyDoodleSelected,
    inkyDoodleResult,
  } = props;

  const [inkyDoodleStack, changeInkyDoodleStack] = useState([
    { main: "", parents: [] },
  ]);
  const [currentInkyDoodleIndex, changeCurrentInkyDoodleIndex] = useState(0);
  const [currentInkyDoodle, changeCurrentInkyDoodle] = useState("");
  const [currentInkyDoodleParents, changeCurrentInkyDoodleParents] = useState(
    ""
  );
  const [parent1, changeParent1] = useState("");
  const [parent2, changeParent2] = useState("");

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
      }
    }
  }, [inkyDoodleStack, currentInkyDoodleIndex]);

  useEffect(() => {
    if (inkyDoodleResult) {
      if (!inkyDoodleStack[0].main) {
        changeInkyDoodleStack([{ main: inkyDoodleResult, parents: [] }]);
      }
    }
  }, [inkyDoodleResult, inkyDoodleStack, currentInkyDoodleIndex]);

  useEffect(() => {
    if (currentInkyDoodle) {
      if (currentInkyDoodle.parents) {
        if (currentInkyDoodleParents.length === 0) {
          const inkyDoodleParentsQuery = `
      query {
          inkyDoodleCollection(where: { 
            OR: [
              { name_contains: "${currentInkyDoodle.parents[0]}" },
              { name_contains: "${currentInkyDoodle.parents[1]}" }
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
              query: inkyDoodleParentsQuery,
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
                      inkyDoodleObj.parents = data.inkyDoodleCollection.items;
                      changeInkyDoodleStack(copyArr);
                      console.log(copyArr);
                    }
                  }
                }
              }
            });
        }
      } else {
        if (currentInkyDoodleParents.length === 0) {
          const copyArr = [...inkyDoodleStack];
          let inkyDoodleObj = copyArr[currentInkyDoodleIndex];

          if (inkyDoodleObj) {
            inkyDoodleObj.parents = [currentInkyDoodle, currentInkyDoodle];
            changeInkyDoodleStack(copyArr);
          }
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
    changeInkyDoodleStack([{ main: "", parents: [] }]);
    changeInkyDoodleSelected("");
    changeCurrentInkyDoodleIndex(0);
    changeCurrentInkyDoodle("");
    changeCurrentInkyDoodleParents([]);
    changeParent1("");
    changeParent2("");
  };

  const handleParentClick = (parent) => {
    if (currentInkyDoodle.generation > 1) {
      changeCurrentInkyDoodleIndex(currentInkyDoodleIndex + 1);
      changeInkyDoodleStack([
        ...inkyDoodleStack,
        { main: parent, parents: [] },
      ]);
      changeCurrentInkyDoodleParents([]);
      changeParent1("");
      changeParent2("");
    }
  };

  const handleBackProfileClick = () => {
    const copyArr = [...inkyDoodleStack];
    copyArr.pop();
    changeInkyDoodleStack(copyArr);

    changeParent1("");
    changeParent2("");
    changeCurrentInkyDoodleIndex(currentInkyDoodleIndex - 1);
    changeCurrentInkyDoodleParents([]);
  };

  const handleInstagramPostClick = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener, noreferrer");
  };

  useEffect(() => {
    if (currentInkyDoodle) {
      if (currentInkyDoodleParents) {
        if (currentInkyDoodleParents.length > 0) {
          changeParent1(
            currentInkyDoodleParents.filter((item) => {
              if (currentInkyDoodle.parents) {
                return item.name === currentInkyDoodle.parents[0];
              } else {
                return item.name === currentInkyDoodle.name;
              }
            })[0]
          );

          changeParent2(
            currentInkyDoodleParents.filter((item) => {
              if (currentInkyDoodle.parents) {
                return item.name === currentInkyDoodle.parents[1];
              } else {
                return item.name === currentInkyDoodle.name;
              }
            })[0]
          );
        }
      }
    }
  }, [currentInkyDoodle, currentInkyDoodleParents]);

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
              className="nes-pointer"
              onClick={handleBackProfileClick}
            >
              <MdArrowBack />
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
          <StyledParentsContainer>
            <StyledIndividualParentContainer
              onClick={() => handleParentClick(parent1)}
              className={
                currentInkyDoodle.generation > 1 ? "nes-pointer" : null
              }
              linked={currentInkyDoodle.generation > 1}
            >
              {parent1 ? (
                <>
                  <p>
                    <b>Parent 1:</b>
                  </p>
                  <p>{parent1.name}</p>
                  <img src={parent1.image.url} alt={parent1.name} />
                  {currentInkyDoodle.generation > 1 ? (
                    <MdSubdirectoryArrowRight />
                  ) : null}
                </>
              ) : (
                <ClipLoader loading={true} size={40} />
              )}
            </StyledIndividualParentContainer>
            <StyledIndividualParentContainer
              onClick={() => handleParentClick(parent2)}
              className={
                currentInkyDoodle.generation > 1 ? "nes-pointer" : null
              }
              linked={currentInkyDoodle.generation > 1}
            >
              {parent2 ? (
                <>
                  <p>
                    <b>Parent 2:</b>
                  </p>
                  <p>{parent2.name}</p>
                  <img src={parent2.image.url} alt={parent2.name} />
                  {currentInkyDoodle.generation > 1 ? (
                    <MdSubdirectoryArrowRight />
                  ) : null}
                </>
              ) : (
                <ClipLoader loading={true} size={40} />
              )}
            </StyledIndividualParentContainer>
          </StyledParentsContainer>
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
          <StyledSectionContainer instagram>
            <p>Instagram</p>
            <StyledDescriptionLine>
              <p>
                <b>Posted:</b>
              </p>
              <p>{inkyDoodleResult.instagram ? "Yes" : "No"}</p>
            </StyledDescriptionLine>
            <StyledDescriptionLine>
              <p>
                <b>{inkyDoodleResult.instagram ? `Date:` : `Scheduled:`}</b>
              </p>
              <p>
                {inkyDoodleResult.instagram
                  ? `${inkyDoodleResult.instagram.date}`
                  : `${dayjs("February 7, 2021")
                      .add(inkyDoodleResult.number + 1, "day")
                      .format("MMMM D, YYYY")} `}
              </p>
            </StyledDescriptionLine>
            {inkyDoodleResult.instagram ? (
              <StyledInstagramLink
                className="nes-btn is-primary"
                onClick={(e) =>
                  handleInstagramPostClick(e, inkyDoodleResult.instagram.url)
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
