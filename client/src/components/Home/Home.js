import React from "react";
import InkyDoodleLogo from "../../images/InkyDoodleLogo.png";
import { StyledHomeContainer } from "./styled/StyledHomeContainer";
import { StyledLandingLogoContainer } from "./styled/StyledLandingLogoContainer";
import { StyledHeadingTitleContainer } from "./styled/StyledHeadingTitleContainer";
import { StyledNavButtonsContainer } from "./styled/StyledNavButtonsContainer";
import { StyledLink } from "./styled/StyledLink";
import { StyledLinksContainer } from "./styled/StyledLinksContainer";
import { StyledIconsSection } from "./styled/StyledIconsSection";
import { GrCircleQuestion, GrSearch, GrTree, GrContact } from "react-icons/gr";
import { BiLoaderCircle } from "react-icons/bi";

const Home = () => {
  return (
    <StyledHomeContainer>
      <StyledLandingLogoContainer>
        <img src={InkyDoodleLogo} alt="Inky Doodle Logo" />
      </StyledLandingLogoContainer>
      <StyledHeadingTitleContainer>
        <p>Collect. Combine. Inky Doodle!</p>
      </StyledHeadingTitleContainer>
      <StyledNavButtonsContainer>
        <StyledLink to="/faq">
          <button type="button" className="nes-btn ">
            <GrCircleQuestion />
            FAQ
          </button>
        </StyledLink>
        <StyledLink to="/search">
          <button type="button" className="nes-btn">
            <GrSearch />
            Search Inky Doodles
          </button>
        </StyledLink>
        <StyledLink to="/tree">
          <button type="button" className="nes-btn">
            <GrTree />
            Pedigree Tree
          </button>
        </StyledLink>
        <StyledLink to="/circle">
          <button type="button" className="nes-btn">
            <BiLoaderCircle />
            Circle Mode
          </button>
        </StyledLink>
        <StyledLink to="/contact">
          <button type="button" className="nes-btn">
            <GrContact />
            Contact Us
          </button>
        </StyledLink>
      </StyledNavButtonsContainer>
      <StyledLinksContainer>
        <p>Check us out on</p>
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
      </StyledLinksContainer>
    </StyledHomeContainer>
  );
};

export default Home;
