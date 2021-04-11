import React, { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import axios from "axios";
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
  background: rgb(230, 230, 230);
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
    height: 80%;
  }

  @media (min-width: 768px) and (orientation: portrait) {
    height: 75%;
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    height: 75%;
    font-size: 1rem;
  }
`;

const StyledParentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgb(230, 230, 230);

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
    justify-content: space-evenly;
  }
`;

const StyledIndividualParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p:first-child {
    color: rgb(100, 100, 100);
  }
`;

const StyledDescriptionLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background: rgb(230, 230, 230);

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
  } = props;

  const [parentsInkyDoodles, changeParentsInkyDoodles] = useState("");

  useEffect(() => {
    if (inkyDoodleResult) {
      if (inkyDoodleResult.parents) {
        const inkyDoodleParentsQuery = `
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
      }
    }
  }, [inkyDoodleResult]);

  if (inkyDoodleResult) {
    return (
      <Menu
        disableAutoFocus
        isOpen={inkyDoodleSelected ? true : false}
        onClose={() => changeInkyDoodleSelected("")}
        customCrossIcon={<p>X</p>}
        right
      >
        <StyledProfileTopContainer>
          <h2>{inkyDoodleResult.name}</h2>
          <StyledImageContainer>
            <img
              src={inkyDoodleResult.image.url}
              alt={`${inkyDoodleResult.name}`}
            />
          </StyledImageContainer>
          <h2>{"#" + inkyDoodleResult.number}</h2>
        </StyledProfileTopContainer>
        <StyledProfileDescriptionContainer>
          <StyledDescriptionLine>
            <p>
              <b>Generation:</b>
            </p>
            <p>{" " + inkyDoodleResult.generation}</p>
          </StyledDescriptionLine>
          <StyledDescriptionLine>
            <p>
              <b>Wave:</b>
            </p>
            <p>{inkyDoodleResult.wave ? " " + inkyDoodleResult.wave : " 1"}</p>
          </StyledDescriptionLine>
          <StyledParentsContainer>
            <StyledIndividualParentContainer>
              <p>
                <b>Parent 1:</b>
              </p>
              <p>
                {inkyDoodleResult.parents
                  ? inkyDoodleResult.parents[0]
                  : inkyDoodleResult.name}
              </p>
              <img
                src={
                  parentsInkyDoodles && inkyDoodleResult.parents
                    ? parentsInkyDoodles.filter(
                        (item) => item.name === inkyDoodleResult.parents[0]
                      )[0].image.url
                    : inkyDoodleResult.image.url
                }
                alt={
                  inkyDoodleResult.parents
                    ? inkyDoodleResult.parents[0]
                    : inkyDoodleResult.name
                }
              />
            </StyledIndividualParentContainer>
            <StyledIndividualParentContainer>
              <p>
                <b>Parent 2:</b>
              </p>
              <p>
                {inkyDoodleResult.parents
                  ? inkyDoodleResult.parents[1]
                  : inkyDoodleResult.name}
              </p>
              <img
                src={
                  parentsInkyDoodles && inkyDoodleResult.parents
                    ? parentsInkyDoodles.filter(
                        (item) => item.name === inkyDoodleResult.parents[1]
                      )[0].image.url
                    : inkyDoodleResult.image.url
                }
                alt={
                  inkyDoodleResult.parents
                    ? inkyDoodleResult.parents[1]
                    : inkyDoodleResult.name
                }
              />
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
