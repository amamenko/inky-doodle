import React, { useEffect, useState } from "react";
import { ImHome3 } from "react-icons/im";
import { HiCursorClick } from "react-icons/hi";
import { Link } from "react-router-dom";
import InkyLogo from "../../images/inky.png";
import { StyledBackToHomeButton } from "../Home/styled/StyledBackToHomeButton";
import { StyledAnchor } from "../Search/SearchComponent/styled/StyledAnchor";
import { StyledNavLogo } from "../Search/SearchComponent/styled/StyledNavLogo";
import Xarrow, { Xwrapper } from "react-xarrows";
import styled from "styled-components";
import { getGen1 } from "./getGen1";
import SelectionMenu from "./SelectionMenu";
import "./CircleMode.css";
import { getGen2 } from "./getGen2";
import { getGen3 } from "./getGen3";

const StyledCirclePageWrapper = styled.div`
  @media only screen and (min-width: 1024px) {
    height: 95vh;
    overflow: hidden;
  }
`;

const StyledCircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  width: 100vw;
  margin-top: 1rem;

  @media only screen and (min-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 1024px) {
    padding-left: 10rem;
    padding-right: 10rem;
    margin-top: 0;
    height: 95vh; 
  }

  @media only screen and (min-width: 1600px) {
    padding-left: 15rem;
    padding-right: 15rem;
    margin-top: 0;
  }
}`;

const StyledTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTopMiddleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 4rem;
`;

const StyledBottomMiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFirstFromBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4.4rem;
  position: relative;
  z-index: 999;
  background: rgb(225, 225, 225);
`;

const StyledInkyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${(props) =>
    props.gen === 1 ? "100px" : props.gen === 2 ? "80px" : "70px"};
  height: ${(props) =>
    props.gen === 1 ? "100px" : props.gen === 2 ? "80px" : "70px"};
  font-size: 0.8rem;
  background: #fff;
  border: 1px solid #000;
  position: relative;
  z-index: 999;

  @media only screen and (min-width: 768px) {
    width: ${(props) =>
      props.gen === 1 ? "150px" : props.gen === 2 ? "130px" : "110px"};
    height: ${(props) =>
      props.gen === 1 ? "150px" : props.gen === 2 ? "130px" : "110px"};

    &:hover {
      background: ${(props) =>
        props.gen === 1 ? "rgba(176, 224, 230, 0.7)" : ""};
      box-shadow: none;
    }
  }

  @media only screen and (min-width: 1400px) and (max-height: 700px) {
    width: ${(props) =>
      props.gen === 1 ? "100px" : props.gen === 2 ? "80px" : "70px"};
    height: ${(props) =>
      props.gen === 1 ? "100px" : props.gen === 2 ? "80px" : "70px"};
  }
`;

const StyledTitle = styled.div`
  display: flex;
  white-space: nowrap;
`;

const StyledContainerImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  width: auto;
  height: 100%;

  @media only screen and (min-width: 768px) {
    padding-top: 1rem;
    height: 80%;
  }
`;

const CircleMode = () => {
  const [selectingGen1, changeSelectingGen1] = useState("");
  const [availableGen1, changeAvailableGen1] = useState("");

  const [topLeftGen1, changeTopLeftGen1] = useState("");
  const [topRightGen1, changeTopRightGen1] = useState("");
  const [bottomGen1, changeBottomGen1] = useState("");

  const [topGen2, changeTopGen2] = useState("");
  const [leftGen2, changeLeftGen2] = useState("");
  const [rightGen2, changeRightGen2] = useState("");

  const [leftGen3, changeLeftGen3] = useState("");
  const [rightGen3, changeRightGen3] = useState("");
  const [bottomGen3, changeBottomGen3] = useState("");

  useEffect(() => {
    const gen1Results = async () => {
      changeAvailableGen1(await getGen1());
    };

    gen1Results();
  }, []);

  useEffect(() => {
    const gen2Results = async (parent1, parent2, changeFn) => {
      if (parent1.name === parent2.name) {
        changeFn(parent1);
      } else {
        const results = await getGen2(parent1, parent2);

        if (results && results[0]) {
          changeFn(results[0]);
        }
      }
    };

    if (topLeftGen1 && topRightGen1) {
      gen2Results(topLeftGen1, topRightGen1, changeTopGen2);
    }

    if (bottomGen1 && topLeftGen1) {
      gen2Results(bottomGen1, topLeftGen1, changeLeftGen2);
    }

    if (bottomGen1 && topRightGen1) {
      gen2Results(bottomGen1, topRightGen1, changeRightGen2);
    }
  }, [
    topLeftGen1,
    topRightGen1,
    bottomGen1,
    changeTopGen2,
    changeLeftGen2,
    changeRightGen2,
  ]);

  useEffect(() => {
    const gen3Results = async (parent1, parent2, changeFn) => {
      if (parent1.name === parent2.name) {
        changeFn(parent1);
      } else if (!parent1.parents) {
        changeFn(parent1);
      } else if (!parent2.parents) {
        changeFn(parent2);
      } else {
        const results = await getGen3(parent1, parent2);

        if (results && results[0]) {
          changeFn(results[0]);
        }
      }
    };

    if (leftGen2 && rightGen2) {
      gen3Results(leftGen2, rightGen2, changeBottomGen3);
    }

    if (topGen2 && leftGen2) {
      gen3Results(topGen2, leftGen2, changeLeftGen3);
    }

    if (topGen2 && rightGen2) {
      gen3Results(topGen2, rightGen2, changeRightGen3);
    }
  }, [
    topGen2,
    leftGen2,
    rightGen2,
    changeBottomGen3,
    changeLeftGen3,
    changeRightGen3,
  ]);

  return (
    <StyledCirclePageWrapper>
      <SelectionMenu
        selectingGen1={selectingGen1}
        changeSelectingGen1={changeSelectingGen1}
        changeTopLeftGen1={changeTopLeftGen1}
        changeTopRightGen1={changeTopRightGen1}
        changeBottomGen1={changeBottomGen1}
        availableGen1={availableGen1}
      />
      <Xwrapper>
        <StyledAnchor href="/">
          <StyledNavLogo src={InkyLogo} alt="Inky Doodle Logo" />
        </StyledAnchor>
        <Link to="/">
          <StyledBackToHomeButton type="button" className="nes-btn is-warning">
            <ImHome3 />
            <p>Home</p>
          </StyledBackToHomeButton>
        </Link>
        {topGen2 && (
          <Xarrow
            start={"gen1_left_container"}
            end={"gen2_top_container"}
            animateDrawing={0.5}
            color="red"
          />
        )}
        {topGen2 && (
          <Xarrow
            start={"gen1_right_container"}
            end={"gen2_top_container"}
            animateDrawing={0.5}
            color="red"
          />
        )}
        {rightGen2 && (
          <Xarrow
            start={"gen1_right"}
            end={"gen2_bottom_right_gen1_container"}
            animateDrawing={0.5}
            color="red"
            curveness={0.5}
            zIndex={1000}
          />
        )}
        {leftGen2 && (
          <Xarrow
            start={"gen1_left"}
            end={"gen2_bottom_left_gen1_container"}
            animateDrawing={0.5}
            color="red"
            curveness={0.5}
            zIndex={1000}
          />
        )}
        {leftGen2 && (
          <Xarrow
            start={"gen1_bottom"}
            end={"gen2_bottom_left_gen1"}
            animateDrawing={0.5}
            color="red"
            startAnchor="left"
            endAnchor="bottom"
            zIndex={1000}
            curveness={1}
          />
        )}
        {rightGen2 && (
          <Xarrow
            start="gen1_bottom"
            end="gen2_bottom_right_gen1"
            color={"red"}
            animateDrawing={0.5}
            startAnchor="right"
            endAnchor="bottom"
            zIndex={1000}
            curveness={1}
          />
        )}
        {leftGen3 && (
          <Xarrow
            start="gen2_bottom_left_gen1_container"
            end="gen3_left"
            color={"blue"}
            startAnchor="right"
            endAnchor="bottom"
            animateDrawing={0.5}
            curveness={1}
          />
        )}
        {leftGen3 && (
          <Xarrow
            start="gen2_top"
            end="gen3_left_container"
            color={"blue"}
            animateDrawing={0.5}
            zIndex={1000}
          />
        )}
        {rightGen3 && (
          <Xarrow
            start="gen2_top"
            end="gen3_right_container"
            color={"blue"}
            animateDrawing={0.5}
            zIndex={1000}
          />
        )}
        {rightGen3 && (
          <Xarrow
            start="gen2_bottom_right_gen1_container"
            end="gen3_right"
            color={"blue"}
            animateDrawing={0.5}
            startAnchor="left"
            endAnchor="bottom"
            zIndex={1000}
          />
        )}
        {bottomGen3 && (
          <Xarrow
            start="gen2_bottom_left_gen1_container"
            end="gen3_bottom"
            color={"blue"}
            animateDrawing={0.5}
            curveness={0.5}
            startAnchor={"right"}
            endAnchor={"left"}
            zIndex={1000}
          />
        )}
        {bottomGen3 && (
          <Xarrow
            start="gen2_bottom_right_gen1_container"
            end="gen3_bottom"
            color={"blue"}
            animateDrawing={0.5}
            curveness={0.5}
            startAnchor={"left"}
            endAnchor={"right"}
            zIndex={1000}
          />
        )}

        <StyledCircleContainer>
          {/* Top two gen 1 parents */}
          <StyledTopContainer>
            <StyledInkyContainer
              className="nes-container is-rounded gen1_left nes-btn with-title"
              gen={1}
              id={"gen1_left_container"}
              onClick={() => changeSelectingGen1("left")}
            >
              <StyledTitle className="title">Gen 1</StyledTitle>
              {topLeftGen1 ? (
                <>
                  <StyledContainerImage src={topLeftGen1.image.url} />
                  <div className="inky_name_tag nes-container" id={"gen1_left"}>
                    {topLeftGen1.name}
                  </div>
                </>
              ) : (
                <HiCursorClick
                  className={`clickable_icon ${
                    selectingGen1 ? "" : "animating"
                  }`}
                  color="rgba(46, 122, 196, 0.8)"
                />
              )}
            </StyledInkyContainer>
            <StyledInkyContainer
              className={`nes-container is-rounded gen2_top with-title ${
                topGen2 ? "" : "hidden"
              }`}
              id={"gen2_top_container"}
              gen={2}
            >
              <StyledTitle className="title">Gen 2</StyledTitle>
              {topGen2 ? (
                <>
                  <StyledContainerImage src={topGen2.image.url} />
                  <div
                    className="inky_name_tag gen2 nes-container"
                    id={"gen2_top"}
                  >
                    {topGen2.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
            <StyledInkyContainer
              className="nes-container is-rounded gen1_right with-title nes-btn"
              gen={1}
              id={"gen1_right_container"}
              onClick={() => changeSelectingGen1("right")}
            >
              <StyledTitle className="title">Gen 1</StyledTitle>{" "}
              {topRightGen1 ? (
                <>
                  <StyledContainerImage src={topRightGen1.image.url} />
                  <div
                    className="inky_name_tag nes-container"
                    id={"gen1_right"}
                  >
                    {topRightGen1.name}
                  </div>
                </>
              ) : (
                <HiCursorClick
                  className={`clickable_icon ${
                    selectingGen1 ? "" : "animating"
                  }`}
                  color="rgba(46, 122, 196, 0.8)"
                />
              )}
            </StyledInkyContainer>
          </StyledTopContainer>

          {/* Gen 3 offspring of two gen 2 parents */}
          <StyledTopMiddleContainer>
            {((!bottomGen1 && !topLeftGen1 && !topRightGen1) ||
              (bottomGen1 && !topLeftGen1 && !topRightGen1) ||
              (!bottomGen1 && topLeftGen1 && !topRightGen1) ||
              (!bottomGen1 && !topLeftGen1 && topRightGen1)) && (
              <h1 className="circle_title">Circle Mode</h1>
            )}
            <StyledInkyContainer
              className={`nes-container is-rounded gen3_left with-title ${
                leftGen3 ? "" : "hidden"
              }`}
              id={"gen3_left_container"}
              gen={3}
            >
              <StyledTitle className="title">Gen 3</StyledTitle>
              {leftGen3 ? (
                <>
                  <StyledContainerImage src={leftGen3.image.url} />
                  <div
                    className="inky_name_tag gen3 nes-container"
                    id={"gen3_left"}
                  >
                    {leftGen3.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
            <StyledInkyContainer
              className={`nes-container is-rounded gen3_right with-title ${
                rightGen3 ? "" : "hidden"
              }`}
              id={"gen3_right_container"}
              gen={3}
            >
              <StyledTitle className="title">Gen 3</StyledTitle>
              {rightGen3 ? (
                <>
                  <StyledContainerImage src={rightGen3.image.url} />
                  <div
                    className="inky_name_tag gen3 nes-container"
                    id={"gen3_right"}
                  >
                    {rightGen3.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
          </StyledTopMiddleContainer>

          {/* Gen 2 offspring of bottom gen 1 and top 2 gen 1 parents */}
          <StyledBottomMiddleContainer>
            {((!bottomGen1 && !topLeftGen1 && !topRightGen1) ||
              (bottomGen1 && !topLeftGen1 && !topRightGen1) ||
              (!bottomGen1 && topLeftGen1 && !topRightGen1) ||
              (!bottomGen1 && !topLeftGen1 && topRightGen1)) && (
              <h2 className="circle_prompt">
                Select three Gen 1 parents
                <br /> to view their Gen 2 and <br />
                Gen 3 combinations!
              </h2>
            )}
            <StyledInkyContainer
              className={`nes-container is-rounded gen2_bottom_left_gen1 with-title ${
                leftGen2 ? "" : "hidden"
              }`}
              id={"gen2_bottom_left_gen1_container"}
              gen={2}
            >
              <StyledTitle className="title">Gen 2</StyledTitle>
              {leftGen2 ? (
                <>
                  <StyledContainerImage src={leftGen2.image.url} />
                  <div
                    className="inky_name_tag gen2 nes-container"
                    id={"gen2_bottom_left_gen1"}
                  >
                    {leftGen2.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
            <StyledInkyContainer
              className={`nes-container is-rounded gen2_bottom_right_gen1 with-title ${
                rightGen2 ? "" : "hidden"
              }`}
              id={"gen2_bottom_right_gen1_container"}
              gen={2}
            >
              <StyledTitle className="title">Gen 2</StyledTitle>
              {rightGen2 ? (
                <>
                  <StyledContainerImage src={rightGen2.image.url} />
                  <div
                    className="inky_name_tag gen2 nes-container"
                    id={"gen2_bottom_right_gen1"}
                  >
                    {rightGen2.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
          </StyledBottomMiddleContainer>

          {/* Gen 3 offspring of bottom gen 1 / top gen 1 parents' gen 2 offspring */}
          <StyledFirstFromBottomContainer>
            <StyledInkyContainer
              className={`nes-container is-rounded gen3_bottom with-title ${
                bottomGen3 ? "" : "hidden"
              }`}
              id={"gen3_bottom"}
              gen={3}
            >
              <StyledTitle className="title">Gen 3</StyledTitle>
              {bottomGen3 ? (
                <>
                  <StyledContainerImage src={bottomGen3.image.url} />
                  <div className="inky_name_tag gen3 nes-container">
                    {bottomGen3.name}
                  </div>
                </>
              ) : (
                ""
              )}
            </StyledInkyContainer>
          </StyledFirstFromBottomContainer>

          {/* Bottom gen 1 parent */}
          <StyledBottomContainer>
            <StyledInkyContainer
              className="nes-container is-rounded with-title gen1_bottom nes-btn"
              id={"gen1_bottom"}
              gen={1}
              onClick={() => changeSelectingGen1("bottom")}
            >
              <StyledTitle className="title">Gen 1</StyledTitle>
              {bottomGen1 ? (
                <>
                  <StyledContainerImage src={bottomGen1.image.url} />
                  <div className="inky_name_tag nes-container">
                    {bottomGen1.name}
                  </div>
                </>
              ) : (
                <HiCursorClick
                  className={`clickable_icon ${
                    selectingGen1 ? "" : "animating"
                  }`}
                  color="rgba(46, 122, 196, 0.8)"
                />
              )}
            </StyledInkyContainer>
          </StyledBottomContainer>
        </StyledCircleContainer>
      </Xwrapper>
    </StyledCirclePageWrapper>
  );
};

export default CircleMode;
