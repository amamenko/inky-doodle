import React, { useState, useEffect } from "react";
import InkyDoodle from "./components/InkyDoodle";
import styled from "styled-components";
import axios from "axios";
import LeftParents from "./components/LeftParents";
import RightParents from "./components/RightParents";
import "./App.css";

const StyledMainContainer = styled.div`
  font-family: "Press Start 2P";
  font-size: 1rem;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 10vh;
  margin-bottom: 10vh;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;

const StyledParentsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const App = () => {
  const [parentInkyDoodles, changeParentInkyDoodles] = useState("");

  const parentInkyDoodlesQuery = `
        query {
            inkyDoodleCollection(where: {generation_in: 1}) {
                items   {
                generation
                name
                image {
                    url
                }
            }
        }
    }
`;

  useEffect(() => {
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

        changeParentInkyDoodles(data.inkyDoodleCollection.items);
      });
  }, [parentInkyDoodlesQuery]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
      />
      <StyledMainContainer>
        <StyledParentsContainer>
          <LeftParents parentInkyDoodles={parentInkyDoodles} />
        </StyledParentsContainer>
        <StyledParentsContainer>
          <RightParents parentInkyDoodles={parentInkyDoodles} />
        </StyledParentsContainer>
      </StyledMainContainer>
      <StyledMainContainer>
        <StyledParentsContainer style={{ justifyContent: "space-around" }}>
          <InkyDoodle />
          <InkyDoodle />
        </StyledParentsContainer>
      </StyledMainContainer>
      <StyledMainContainer>
        <InkyDoodle />
      </StyledMainContainer>
    </>
  );
};

export default App;
