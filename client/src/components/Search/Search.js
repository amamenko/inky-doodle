import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactPaginate from "react-paginate";
import InkyLogo from "../../images/inky.png";
import "./Pagination.css";
import InkyDoodleProfile from "./InkyDoodleProfile";

const StyledSearchPageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 1200px) {
    height: 80vh;
  }
`;

const StyledSearchField = styled.div`
  font-size: 0.8rem;
  width: 75%;
  margin-top: 2rem;

  input {
    color: #000 !important;
  }

  @media (min-width: 1200px) {
    width: 40%;
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

const StyledPreviewContainer = styled.div`
  height: 5rem;
  margin: 1rem;
  background: #fff;
  position: relative;
  width: calc(100% - 6rem);

  &:hover {
    cursor: pointer;
  }

  p {
    padding: 0.5rem 0 0 20%;
    margin: 0;
    font-size: 0.8rem;

    &:last-child {
      position: absolute;
      right: 10%;
    }
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

  @media (max-width: 374px) {
    p {
      font-size: 0.6rem;
      padding: 0.7rem 0 0 25%;
    }
  }

  @media (min-width: 376px) {
    width: calc(100% - 6.5rem);
  }

  @media (min-width: 500px) {
    width: 75%;
  }

  @media (min-width: 768px) {
    height: 7rem;

    img {
      top: 28%;
      left: 4rem;
    }

    p {
      padding: 0.3rem 0 0 30%;
      font-size: 1rem;
    }
  }

  @media (min-width: 1200px) {
    height: 6rem;
    margin: 1rem;
    width: 40%;
  }
`;

const StyledPreviewContentsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    height: 65%;
  }
`;

const StyledPreviewTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const StyledNavLogo = styled.img`
  max-width: 6rem;

  @media (min-width: 1200px) {
    position: fixed;
    top: 1rem;
    left: 1rem;
  }
`;

const StyledAnchor = styled.a`
  align-self: flex-start;
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

const StyledResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;

  @media (min-width: 1200px) {
    margin: 5rem 0;
    position: absolute;
    top: 15rem;
  }
`;

const Search = () => {
  const [userInput, changeUserInput] = useState("");
  const [inkyDoodleResults, changeInkyDoodleResults] = useState("");
  const [pageCount, changePageCount] = useState(0);
  const [currentPage, changeCurrentPage] = useState(0);
  const [inkyDoodleSelected, changeInkyDoodleSelected] = useState("");

  const handleUserInput = (e) => {
    changeUserInput(e.target.value);

    if (currentPage !== 0) {
      changeCurrentPage(0);
    }
  };

  const inkyDoodlesMatchQuery = `
        query {
            inkyDoodleCollection(limit: 2000, order: [generation_ASC, name_ASC], where: {name_contains: "${userInput}"}) {
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
                const filteredInkyDoodles = data.inkyDoodleCollection.items.filter(
                  (item) =>
                    item.name.toLowerCase().slice(0, userInput.length) ===
                    userInput.toLowerCase().trim()
                );

                changeInkyDoodleResults(filteredInkyDoodles);

                changePageCount(Math.ceil(filteredInkyDoodles.length / 4));
              }
            }
          }
        });
    } else {
      changeInkyDoodleResults("");
    }
  }, [inkyDoodlesMatchQuery, userInput]);

  const handlePageChange = (data) => {
    changeCurrentPage(data.selected);
  };

  return (
    <>
      <InkyDoodleProfile
        inkyDoodleSelected={inkyDoodleSelected}
        inkyDoodleResult={
          inkyDoodleResults &&
          inkyDoodleResults.filter(
            (item) => item.number === inkyDoodleSelected
          )[0]
        }
        changeInkyDoodleSelected={changeInkyDoodleSelected}
      />
      <StyledSearchPageContainer>
        <StyledAnchor href="/">
          <StyledNavLogo src={InkyLogo} alt="Inky Doodle Logo" />
        </StyledAnchor>
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
        <StyledResultsContainer>
          {inkyDoodleResults &&
            inkyDoodleResults
              .slice(currentPage * 4, currentPage * 4 + 4)
              .map((result) => {
                return (
                  <StyledPreviewContainer
                    key={result.number}
                    className="nes-container with-title"
                    onClick={() => changeInkyDoodleSelected(result.number)}
                  >
                    <p className="title">Gen {result.generation}</p>
                    <StyledPreviewContentsContainer>
                      <StyledPreviewTextContainer>
                        <p>{result.name}</p>
                        <p>{">"}</p>
                      </StyledPreviewTextContainer>
                      <img src={result.image.url} alt={`${result.name}`} />
                    </StyledPreviewContentsContainer>
                  </StyledPreviewContainer>
                );
              })}
        </StyledResultsContainer>

        {inkyDoodleResults && inkyDoodleResults.length > 5 ? (
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        ) : null}
      </StyledSearchPageContainer>
    </>
  );
};

export default Search;
