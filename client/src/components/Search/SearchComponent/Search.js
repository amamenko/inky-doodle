import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import EmptySearch from "./EmptySearch";
import InkyLogo from "../../../images/inky.png";
import InkyDoodleProfile from "../InkyDoodleProfile/InkyDoodleProfile";
import ClipLoader from "react-spinners/ClipLoader";
import { StyledSearchPageContainer } from "./styled/StyledSearchPageContainer";
import { StyledAnchor } from "./styled/StyledAnchor";
import { StyledNavLogo } from "./styled/StyledNavLogo";
import { StyledSearchField } from "./styled/StyledSearchField";
import { StyledResultsContainer } from "./styled/StyledResultsContainer";
import { StyledPreviewContainer } from "./styled/StyledPreviewContainer";
import { StyledPreviewContentsContainer } from "./styled/StyledPreviewContentsContainer";
import { StyledPreviewTextContainer } from "./styled/StyledPreviewTextContainer";
import { StyledPreviewNumberContainer } from "./styled/StyledPreviewNumberContainer";
import { StyledLoadingContainer } from "./styled/StyledLoadingContainer";
import { StyledBackToHomeButton } from "../../Home/styled/StyledBackToHomeButton";
import { Link } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { override } from "./styled/OverridenSpinnerStyles";
import AerBlack from "../../../images/AerBlack.png";
import BeeBlack from "../../../images/BeeBlack.png";
import GavBlack from "../../../images/GavBlack.png";
import HalBlack from "../../../images/HalBlack.png";
import KarBlack from "../../../images/KarBlack.png";
import QuaBlack from "../../../images/QuaBlack.png";
import RadBlack from "../../../images/RadBlack.png";
import ScrBlack from "../../../images/ScrBlack.png";
import XltBlack from "../../../images/XltBlack.png";
import "./Pagination.css";

const Search = () => {
  const [userInput, changeUserInput] = useState("");
  const [inkyDoodleResults, changeInkyDoodleResults] = useState("");
  const [pageCount, changePageCount] = useState(0);
  const [currentPage, changeCurrentPage] = useState(0);
  const [inkyDoodleSelected, changeInkyDoodleSelected] = useState("");
  const [loadingResults, changeLoadingResults] = useState(false);

  // For individual profile
  const [parentsInkyDoodles, changeParentsInkyDoodles] = useState("");

  // For empty state
  const [selectedOption, changeSelectedOption] = useState(0);

  const searchRef = useRef(null);

  const optionsArr = [
    AerBlack,
    BeeBlack,
    GavBlack,
    HalBlack,
    KarBlack,
    QuaBlack,
    RadBlack,
    ScrBlack,
    XltBlack,
  ];

  useEffect(() => {
    changeSelectedOption(Math.floor(Math.random() * 8));
  }, []);

  useEffect(() => {
    if (searchRef) {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }
  }, []);

  const handleUserInput = (e) => {
    changeUserInput(e.target.value);
    changeLoadingResults(true);

    if (currentPage !== 0) {
      changeCurrentPage(0);
    }
  };

  const inkyDoodlesMatchQuery = `
        query {
            inkyDoodleCollection(limit: 2000, order: [generation_ASC, name_ASC], where: ${
              Number(userInput)
                ? `{number_in: ${Number(userInput)}, `
                : `{name_contains: "${userInput}, "`
            } wave_not_in: [3, 4, 5]}) {
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
            changeLoadingResults(false);
          }

          if (data) {
            if (data.inkyDoodleCollection) {
              if (data.inkyDoodleCollection.items) {
                const filteredInkyDoodles =
                  data.inkyDoodleCollection.items.filter((item) => {
                    if (!Number(userInput)) {
                      return (
                        item.name.toLowerCase().slice(0, userInput.length) ===
                        userInput.toLowerCase().trim()
                      );
                    }

                    return true;
                  });

                changeInkyDoodleResults(filteredInkyDoodles);

                changePageCount(Math.ceil(filteredInkyDoodles.length / 4));

                changeLoadingResults(false);
              }
            }
          }
        });
    } else {
      changeInkyDoodleResults("");
      changeLoadingResults(false);
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
        <Link to="/">
          <StyledBackToHomeButton type="button" className="nes-btn is-warning">
            <ImHome3 />
            <p>Home</p>
          </StyledBackToHomeButton>
        </Link>
        <StyledSearchField className="nes-field">
          <label htmlFor="search_field">Search for an Inky Doodle</label>
          <input
            type="text"
            id="search_field"
            className="nes-input"
            value={userInput}
            onChange={handleUserInput}
            ref={searchRef}
          />
        </StyledSearchField>
        <StyledResultsContainer>
          {inkyDoodleResults && inkyDoodleResults.length > 0 ? (
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
          ) : loadingResults ? (
            <StyledLoadingContainer>
              <ClipLoader loading={true} size={150} css={override} />
            </StyledLoadingContainer>
          ) : (
            <EmptySearch
              userInput={userInput}
              selectedOption={selectedOption}
              optionsArr={optionsArr}
            />
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
