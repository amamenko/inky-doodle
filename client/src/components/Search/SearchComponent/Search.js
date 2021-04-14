import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import EmptySearch from "./EmptySearch";
import InkyLogo from "../../../images/inky.png";
import InkyDoodleProfile from "../InkyDoodleProfile/InkyDoodleProfile";
import { StyledSearchPageContainer } from "./styled/StyledSearchPageContainer";
import { StyledAnchor } from "./styled/StyledAnchor";
import { StyledNavLogo } from "./styled/StyledNavLogo";
import { StyledSearchField } from "./styled/StyledSearchField";
import { StyledResultsContainer } from "./styled/StyledResultsContainer";
import { StyledPreviewContainer } from "./styled/StyledPreviewContainer";
import { StyledPreviewContentsContainer } from "./styled/StyledPreviewContentsContainer";
import { StyledPreviewTextContainer } from "./styled/StyledPreviewTextContainer";
import { StyledPreviewNumberContainer } from "./styled/StyledPreviewNumberContainer";
import "./Pagination.css";

const Search = () => {
  const [userInput, changeUserInput] = useState("");
  const [inkyDoodleResults, changeInkyDoodleResults] = useState("");
  const [pageCount, changePageCount] = useState(0);
  const [currentPage, changeCurrentPage] = useState(0);
  const [inkyDoodleSelected, changeInkyDoodleSelected] = useState("");

  // For individual profile
  const [parentsInkyDoodles, changeParentsInkyDoodles] = useState("");

  const handleUserInput = (e) => {
    changeUserInput(e.target.value);

    if (currentPage !== 0) {
      changeCurrentPage(0);
    }
  };

  const inkyDoodlesMatchQuery = `
        query {
            inkyDoodleCollection(limit: 2000, order: [generation_ASC, name_ASC], where: ${
              Number(userInput)
                ? `{number_in: ${Number(userInput)}}`
                : `{name_contains: "${userInput}"}`
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
                  (item) => {
                    if (!Number(userInput)) {
                      return (
                        item.name.toLowerCase().slice(0, userInput.length) ===
                        userInput.toLowerCase().trim()
                      );
                    }

                    return true;
                  }
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
        parentsInkyDoodles={parentsInkyDoodles}
        changeParentsInkyDoodles={changeParentsInkyDoodles}
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
          {inkyDoodleResults ? (
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
                        <StyledPreviewNumberContainer>
                          {result.number}
                        </StyledPreviewNumberContainer>
                        <p>{result.name}</p>
                        <p>{">"}</p>
                      </StyledPreviewTextContainer>
                      <img src={result.image.url} alt={`${result.name}`} />
                    </StyledPreviewContentsContainer>
                  </StyledPreviewContainer>
                );
              })
          ) : (
            <EmptySearch />
          )}
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
