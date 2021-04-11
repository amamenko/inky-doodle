import React from "react";
import InkyDoodleLogo from "../../images/InkyDoodleLogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHomeContainer = styled.div`
  font-size: 0.8rem;

  @media (min-width: 52rem) {
    font-size: 1rem;
  }
`;

const StyledLandingLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rem 3rem 3rem 3rem;
`;

const StyledNavButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    margin-top: 3rem;
    padding: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  width: 80%;
  max-width: 50rem;

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 40%;
  }
`;

const StyledHeadingTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIconsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  a {
    margin: 2rem;
  }
`;

const Home = () => {
  return (
    <StyledHomeContainer>
      <StyledIconsSection className="icon-list">
        <a
          href="https://www.instagram.com/inkydoodle.ml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon instagram is-medium" />
        </a>
        <a
          href="https://github.com/amamenko/inky-doodle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon github is-medium" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=VPKyCoFkgS0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon youtube is-medium" />
        </a>
      </StyledIconsSection>
      <StyledLandingLogoContainer>
        <img src={InkyDoodleLogo} alt="Inky Doodle Logo" />
      </StyledLandingLogoContainer>
      <StyledHeadingTitleContainer>
        <p>Collect.</p>
        <p>Combine.</p>
        <p>Inky Doodle!</p>
      </StyledHeadingTitleContainer>
      <StyledNavButtonsContainer>
        <StyledLink to="/about">
          <button type="button" className="nes-btn ">
            About
          </button>
        </StyledLink>
        <StyledLink to="/search">
          <button type="button" className="nes-btn">
            Search Inky Doodles
          </button>
        </StyledLink>
        <StyledLink to="/tree">
          <button type="button" className="nes-btn">
            Pedigree Tree
          </button>
        </StyledLink>
      </StyledNavButtonsContainer>
    </StyledHomeContainer>
  );
};

export default Home;
