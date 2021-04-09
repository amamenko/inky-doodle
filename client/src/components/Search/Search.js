import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledSearchField = styled.div`
  margin: 2rem;

  input {
    color: #000 !important;
  }
`;

const StyledPreviewContainer = styled.div`
  height: 5rem;
  margin: 2rem;
  background: #fff;
  position: relative;

  p {
    padding: 0.3rem 0 0 20%;
    margin: 0;
  }

  img {
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 10%;
    margin: 0 auto;
    max-height: 2.5rem;
    object-fit: cover;
  }

  @media (min-width: 52rem) {
    height: 6rem;
  }
`;

const Search = () => {
  const [userInput, changeUserInput] = useState("");
  const [inkyDoodleResults, changeInkyDoodleResults] = useState("");

  const handleUserInput = (e) => {
    changeUserInput(e.target.value);
  };

  const inkyDoodlesMatchQuery = `
        query {
            inkyDoodleCollection(limit: 5000) {
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
    if (userInput) {
      axios({
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
        method: "post",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
        data: {
          query: inkyDoodlesMatchQuery,
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
                console.log(data.inkyDoodleCollection.items);
                changeInkyDoodleResults(
                  data.inkyDoodleCollection.items
                    .filter(
                      (item) =>
                        item.name.toLowerCase().slice(0, userInput.length) ===
                        userInput.toLowerCase().trim()
                    )
                    .sort((a, b) => a.name.localeCompare(b.name))
                );
              }
            }
          }
        });
    } else {
      changeInkyDoodleResults("");
    }
  }, [inkyDoodlesMatchQuery, userInput]);

  return (
    <div>
      <StyledSearchField className="nes-field">
        <label htmlFor="search_field">Search for an Inky Doodle</label>
        <input
          type="text"
          id="search_field"
          className="nes-input"
          value={userInput}
          onChange={handleUserInput}
        />
      </StyledSearchField>
      {inkyDoodleResults &&
        inkyDoodleResults.map((result) => {
          return (
            <StyledPreviewContainer
              key={result.number}
              className="nes-container with-title"
            >
              <p className="title">Gen {result.generation}</p>
              <p>{result.name}</p>
              <img src={result.image.url} alt={`${result.name}`} />
            </StyledPreviewContainer>
          );
        })}
    </div>
  );
};

export default Search;
