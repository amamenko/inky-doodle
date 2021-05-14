import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { StyledAnchor } from "../Search/SearchComponent/styled/StyledAnchor";
import { StyledNavLogo } from "../Search/SearchComponent/styled/StyledNavLogo";
import { ImHome3 } from "react-icons/im";
import { StyledBackToHomeButton } from "../../components/Home/styled/StyledBackToHomeButton";
import InkyLogo from "../../images/inky.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PadushkaHead from "../../images/PadushkaHead.png";

const StyledFAQPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-bottom: 3rem;

  h2 {
    font-size: 1rem;
    margin: 2rem 0;
    text-align: center;
  }

  @media (min-width: 1024px) {
    width: 50%;
    margin: 0 auto;
  }
`;

const StyledQuestionContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledCollapsibleQuestionContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(150, 150, 150);
  color: ${(props) => (props.isOpened ? "#fff" : "rgb(100, 100, 100)")};
  padding: 1rem;
  background: ${(props) => (props.isOpened ? "rgb(150, 150, 150)" : "#fff")};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 500px) {
    font-size: 0.6rem;
  }

  @keyframes roll {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  img {
    width: 25px;
    transition: transform 0.5s ease;
    animation: ${(props) => (props.isOpened ? "0.4s roll" : "none")};
  }

  p {
    margin: 0;
    padding-left: 1rem;
  }

  @media (min-width: 1200px) {
    &:hover {
      background: ${(props) =>
        props.isOpened ? "rgb(150, 150, 150)" : "rgb(200, 200, 200)"};
      color: ${(props) => (props.isOpened ? "#fff" : " #007eb4")};
      transition: background 0.2s ease, color 0.2s ease;
    }
  }
`;

const StyledCollapsibleContentContainer = styled.div`
  width: 100%;
  background: rgb(245, 245, 245);
  padding: 2rem 1rem;
  font-size: 0.8rem;

  & > a {
    margin: 0;
    padding: 0;
  }
`;

const FAQ = () => {
  const [selectedCollapse, changeSelectedCollapse] = useState(0);

  const handleCollapse = (question) => {
    if (selectedCollapse === question) {
      changeSelectedCollapse(0);
    } else {
      changeSelectedCollapse(question);
    }
  };

  return (
    <>
      <StyledAnchor href="/">
        <StyledNavLogo src={InkyLogo} alt="Inky Doodle Logo" />
      </StyledAnchor>
      <Link to="/">
        <StyledBackToHomeButton type="button" className="nes-btn is-warning">
          <ImHome3 />
          <p>Home</p>
        </StyledBackToHomeButton>
      </Link>
      <StyledFAQPage>
        <h2>Frequently Asked Questions</h2>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 1}
            className="nes-pointer"
            onClick={() => handleCollapse(1)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>What is Inky Doodle?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 1}>
            <StyledCollapsibleContentContainer>
              Inky Doodle is a pixel art project launched in February 2021 that
              follows three generations of Inky Doodle characters. Generation 1
              Inky Doodles breed to form generation 2 hybrids and so on. These
              combinations can be explored through the pedigree tree and the
              search functionality.
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 2}
            className="nes-pointer"
            onClick={() => handleCollapse(2)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>Who's the team behind Inky Doodle?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 2}>
            <StyledCollapsibleContentContainer>
              We are a powerhouse team of two at the moment. Alex is in charge
              of the creative side of things while Avi is in charge of the
              technical details.
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 3}
            className="nes-pointer"
            onClick={() => handleCollapse(3)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>Are Inky Doodles sold as NFTs?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 3}>
            <StyledCollapsibleContentContainer>
              No, at the moment, they are not. However, we do hope to list Inky
              Doodles as NFTs in the near future!
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 4}
            className="nes-pointer"
            onClick={() => handleCollapse(4)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>How do I use the pedigree tree?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 4}>
            <StyledCollapsibleContentContainer>
              Select two left-tree and two right-tree side generation 1 parents
              to create left-tree and right-tree generation 2 parents. Those
              will breed to potentially form generation 3 hybrids.
              <br />
              <br />A more detailed explanation can be found on our{" "}
              <a
                href="https://github.com/amamenko/inky-doodle"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub page
              </a>{" "}
              and in our{" "}
              <a
                href="https://www.youtube.com/watch?v=VPKyCoFkgS0"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube explanation
              </a>
              .
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 5}
            className="nes-pointer"
            onClick={() => handleCollapse(5)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>Why does my tree combination say "No Match" with a red X?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 5}>
            <StyledCollapsibleContentContainer>
              A viable generation 3 hybrid can only be created if its generation
              2 parents share at least one generation 1 parent.
              <br />
              <br />
              In other words, if the generation 1 parents are all different
              (ABCD configuration), then there will not be a generation 3 match.
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 6}
            className="nes-pointer"
            onClick={() => handleCollapse(6)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>Do you manually post new Inky Doodles on Instagram?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 6}>
            <StyledCollapsibleContentContainer>
              Nope! New Inky Doodles are posted automatically every day at 4 PM
              Eastern Time via a Node.js and Express script.
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 7}
            className="nes-pointer"
            onClick={() => handleCollapse(7)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>How can I also automate Instagram posts?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 7}>
            <StyledCollapsibleContentContainer>
              We've created a YouTube tutorial showing how you can use Node.js,
              Express, and Contentful to automatically post your own photos to
              Instagram. Check it out{" "}
              <a
                href="https://www.youtube.com/watch?v=XzyYi_yv86A"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              !
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 8}
            className="nes-pointer"
            onClick={() => handleCollapse(8)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>Can I request a custom Inky Doodle?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 8}>
            <StyledCollapsibleContentContainer>
              Sure. You can contact us via our{" "}
              <Link to="/contact">contact form</Link> for any requests!
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 9}
            className="nes-pointer"
            onClick={() => handleCollapse(9)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>How do I learn more about Inky Doodle?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 9}>
            <StyledCollapsibleContentContainer>
              You can learn more about Inky Doodle on our{" "}
              <a
                href="https://github.com/amamenko/inky-doodle"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub page
              </a>
              , our{" "}
              <a
                href="https://www.youtube.com/watch?v=VPKyCoFkgS0"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube video
              </a>
              , and on our{" "}
              <a
                href="https://www.instagram.com/inkydoodle.ml"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram page
              </a>
              !
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>

        <StyledQuestionContainer>
          <StyledCollapsibleQuestionContainer
            isOpened={selectedCollapse === 10}
            className="nes-pointer"
            onClick={() => handleCollapse(10)}
          >
            <img src={PadushkaHead} alt="Padushka Head" />
            <p>How do I reach you for another question/comment?</p>
          </StyledCollapsibleQuestionContainer>
          <Collapse isOpened={selectedCollapse === 10}>
            <StyledCollapsibleContentContainer>
              You can reach us via our <Link to="/contact">contact form</Link>{" "}
              or by private messaging us directly on{" "}
              <a
                href="https://www.instagram.com/inkydoodle.ml"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              .
            </StyledCollapsibleContentContainer>
          </Collapse>
        </StyledQuestionContainer>
      </StyledFAQPage>
    </>
  );
};

export default FAQ;
