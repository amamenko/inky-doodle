import React, { useEffect, useState, useMemo } from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { MdSubdirectoryArrowRight, MdArrowBack } from "react-icons/md";
import "./ProfileSliderStyles.css";

const StyledProfileTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;

  h2 {
    font-size: 1rem;
    color: #000;
    margin-top: 0.5rem;
  }

  @media (max-width: 374px) {
    h2 {
      font-size: 0.8rem;
    }
  }
`;

const StyledProfileBackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 8px;
  top: 8px;
  background: transparent;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;
  color: #07c;
  border: 1px solid #07c;
  border-radius: 20px;
  font-size: 0.8rem;

  svg {
    path {
      fill: #07c;
    }
  }

  p {
    margin: 0;
    padding: 0 0 0 0.5rem;
    font-size: 0.5rem;
  }

  @media (min-width: 768px) {
    p {
      margin: 0;
      padding: 0 0 0 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  background: transparent;
  width: 100%;

  @media (max-width: 374px) {
    img {
      height: 4rem;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 5rem;
    }
  }

  @media (min-width: 0px) and (orientation: landscape) {
    img {
      height: 4rem;
    }
  }

  @media (min-width: 1200px) and (orientation: landscape) {
    img {
      height: auto;
    }
  }
`;

const StyledProfileDescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  height: 68%;
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #000;
  border-top: 1px solid rgb(150, 150, 150);
  font-size: 0.6rem;

  @media (min-width: 0px) and (orientation: landscape) {
    height: 35%;
  }

  @media (min-width: 500px) and (orientation: portrait) {
    height: 70%;
  }

  @media (min-width: 768px) and (orientation: portrait) {
    height: 75%;
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    height: 65%;
    font-size: 1rem;
  }

  @media (min-width: 2000px) {
    height: 75%;
  }
`;

const StyledParentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1024px) {
    justify-content: space-evenly;
  }
`;

const StyledIndividualParentContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 1rem;
  text-align: center;
  border: 1px solid rgba(150, 150, 150, 0.3);
  height: 10rem;
  width: 100%;

  svg {
    font-size: 1rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;

    path {
      fill: rgb(90, 90, 90);
    }
  }

  & > p:first-child {
    color: rgb(100, 100, 100);
  }

  img {
    max-height: 3rem;
  }

  & > span {
    padding: 1.4rem;
  }

  @media (min-width: 1024px) {
    &:hover {
      background: ${(props) => (props.linked ? "rgb(200, 200, 200)" : "#fff")};
      transition: background 0.2s ease;
    }
  }

  @media (min-width: 1200px) {
    height: 15rem;

    svg {
      font-size: 2rem;
    }

    img {
      max-height: 5rem;
    }

    & > span {
      padding: 2.5rem;
    }
  }
`;

const StyledDescriptionLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background: rgb(235, 235, 235);

  & > p:first-child {
    color: rgb(100, 100, 100);
  }

  @media (min-width: 1024px) {
    padding: 2rem 0;
  }
`;

const InkyDoodleProfile = (props) => {
  const {
    inkyDoodleSelected,
    changeInkyDoodleSelected,
    inkyDoodleResult,
    parentsInkyDoodles,
    changeParentsInkyDoodles,
  } = props;

  const [linkedInkyDoodle, changeLinkedInkyDoodle] = useState("");
  const [secondLinkedInkyDoodle, changeSecondLinkedInkyDoodle] = useState("");
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
                  console.log(data.inkyDoodleCollection);
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
        </StyledProfileDescriptionContainer>
      </Menu>
    );
  } else {
    return null;
  }
};

export default InkyDoodleProfile;
