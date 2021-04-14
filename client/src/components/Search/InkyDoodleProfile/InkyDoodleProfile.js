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
    parentsInkyDoodles,
    changeParentsInkyDoodles,
  } = props;

  const [linkedInkyDoodle, changeLinkedInkyDoodle] = useState("");
  // const [secondLinkedInkyDoodle, changeSecondLinkedInkyDoodle] = useState("");
  const [parent1, changeParent1] = useState("");
  const [parent2, changeParent2] = useState("");

  useEffect(() => {
    if (inkyDoodleResult) {
      if (inkyDoodleResult.parents) {
        let inkyDoodleParentsQuery;

        if (linkedInkyDoodle) {
          if (linkedInkyDoodle.parents) {
            inkyDoodleParentsQuery = `
      query {
          inkyDoodleCollection(where: { 
            OR: [
              { name_contains: "${linkedInkyDoodle.parents[0]}" },
              { name_contains: "${linkedInkyDoodle.parents[1]}" }
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
          }
        } else {
          inkyDoodleParentsQuery = `
      query {
          inkyDoodleCollection(where: { 
            OR: [
              { name_contains: "${inkyDoodleResult.parents[0]}" },
              { name_contains: "${inkyDoodleResult.parents[1]}" }
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
        }

        if (inkyDoodleParentsQuery) {
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
                    changeParentsInkyDoodles(data.inkyDoodleCollection.items);
                  }
                }
              }
            });
        } else {
          if (linkedInkyDoodle) {
            changeParentsInkyDoodles([linkedInkyDoodle, linkedInkyDoodle]);
          } else {
            changeParentsInkyDoodles([inkyDoodleResult, inkyDoodleResult]);
          }
        }
      } else {
        if (linkedInkyDoodle) {
          changeParentsInkyDoodles([linkedInkyDoodle, linkedInkyDoodle]);
        } else {
          changeParentsInkyDoodles([inkyDoodleResult, inkyDoodleResult]);
        }
      }
    }
  }, [inkyDoodleResult, linkedInkyDoodle, changeParentsInkyDoodles]);

  const handleMenuClose = () => {
    changeInkyDoodleSelected("");
    changeParentsInkyDoodles("");
    changeParent1("");
    changeParent2("");
    changeLinkedInkyDoodle("");
  };

  const handleParentClick = (parent) => {
    if (parentsInkyDoodles) {
      if (inkyDoodleResult.generation > 1) {
        changeLinkedInkyDoodle(parent);
      }
    }
  };

  useMemo(() => {
    if (inkyDoodleResult) {
      if (parentsInkyDoodles) {
        changeParent1(
          parentsInkyDoodles.filter((item) => {
            if (inkyDoodleResult.parents) {
              return item.name === inkyDoodleResult.parents[0];
            } else {
              return item.name === inkyDoodleResult.name;
            }
          })[0]
        );

        changeParent2(
          parentsInkyDoodles.filter((item) => {
            if (inkyDoodleResult.parents) {
              return item.name === inkyDoodleResult.parents[1];
            } else {
              return item.name === inkyDoodleResult.name;
            }
          })[0]
        );
      }
    }
  }, [inkyDoodleResult, parentsInkyDoodles]);

  useMemo(() => {
    if (linkedInkyDoodle) {
      if (parentsInkyDoodles) {
        changeParent1(
          parentsInkyDoodles.filter((item) => {
            if (linkedInkyDoodle.parents) {
              return item.name === linkedInkyDoodle.parents[0];
            } else {
              return item.name === linkedInkyDoodle.name;
            }
          })[0]
        );

        changeParent2(
          parentsInkyDoodles.filter((item) => {
            if (linkedInkyDoodle.parents) {
              return item.name === linkedInkyDoodle.parents[1];
            } else {
              return item.name === linkedInkyDoodle.name;
            }
          })[0]
        );
      }
    }
  }, [linkedInkyDoodle, parentsInkyDoodles]);

  const handleBackProfileClick = () => {
    changeLinkedInkyDoodle("");
    changeParentsInkyDoodles("");
    changeParent1("");
    changeParent2("");
  };

  const handleInstagramPostClick = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener, noreferrer");
  };

  if (inkyDoodleResult) {
    return (
      <Menu
        disableAutoFocus
        isOpen={inkyDoodleSelected ? true : false}
        onClose={handleMenuClose}
        customCrossIcon={<p className="nes-pointer">X</p>}
        right
      >
        <StyledProfileTopContainer>
          {linkedInkyDoodle ? (
            <StyledProfileBackContainer
              className="nes-pointer"
              onClick={handleBackProfileClick}
            >
              <MdArrowBack />
              <p>Back to {inkyDoodleResult.name}</p>
            </StyledProfileBackContainer>
          ) : null}
          <h2>
            {linkedInkyDoodle ? linkedInkyDoodle.name : inkyDoodleResult.name}
          </h2>
          <StyledImageContainer>
            <img
              src={
                linkedInkyDoodle
                  ? linkedInkyDoodle.image.url
                  : inkyDoodleResult.image.url
              }
              alt={`${
                linkedInkyDoodle ? linkedInkyDoodle.name : inkyDoodleResult.name
              }`}
            />
          </StyledImageContainer>
          <h2>
            {"#" +
              (linkedInkyDoodle
                ? linkedInkyDoodle.number
                : inkyDoodleResult.number)}
          </h2>
        </StyledProfileTopContainer>
        <StyledProfileDescriptionContainer>
          <StyledParentsContainer>
            <StyledIndividualParentContainer
              onClick={() => handleParentClick(parent1)}
              className={
                linkedInkyDoodle
                  ? linkedInkyDoodle.generation > 1
                  : inkyDoodleResult.generation > 1
                  ? "nes-pointer"
                  : null
              }
              linked={
                linkedInkyDoodle
                  ? linkedInkyDoodle.generation > 1
                  : inkyDoodleResult.generation > 1
              }
            >
              {parent1 ? (
                <>
                  <p>
                    <b>Parent 1:</b>
                  </p>
                  <p>{parent1.name}</p>
                  <img src={parent1.image.url} alt={parent1.name} />
                  {(
                    linkedInkyDoodle
                      ? linkedInkyDoodle.generation > 1
                      : inkyDoodleResult.generation > 1
                  ) ? (
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
                linkedInkyDoodle
                  ? linkedInkyDoodle.generation > 1
                  : inkyDoodleResult.generation > 1
                  ? "nes-pointer"
                  : null
              }
              linked={
                linkedInkyDoodle
                  ? linkedInkyDoodle.generation > 1
                  : inkyDoodleResult.generation > 1
              }
            >
              {parent2 ? (
                <>
                  <p>
                    <b>Parent 2:</b>
                  </p>
                  <p>{parent2.name}</p>
                  <img src={parent2.image.url} alt={parent2.name} />
                  {(
                    linkedInkyDoodle
                      ? linkedInkyDoodle.generation > 1
                      : inkyDoodleResult.generation > 1
                  ) ? (
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
              <p>
                {" " +
                  (linkedInkyDoodle
                    ? linkedInkyDoodle.generation
                    : inkyDoodleResult.generation)}
              </p>
            </StyledDescriptionLine>
            <StyledDescriptionLine>
              <p>
                <b>Wave:</b>
              </p>
              <p>
                {linkedInkyDoodle
                  ? linkedInkyDoodle.wave
                    ? " " + linkedInkyDoodle.wave
                    : " 1"
                  : inkyDoodleResult.wave
                  ? " " + inkyDoodleResult.wave
                  : " 1"}
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
