import React, { useState, useEffect } from "react";
import Select from "react-select";
import nesTheme from "react-select-nes-css-theme";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import "nes.css/css/nes.min.css";

const StyledContainer = styled.div`
  @keyframes slideInFromTop {
    0% {
      transform: translate3d(0, -40px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  animation: 0.5s ease slideInFromTop;
  display: flex;
  flex-direction: column;
  max-width: 15rem;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  object-fit: contain;
  transform: scale(0.5);
`;

const StyledX = styled.p`
  color: red;
  font-size: calc(2vw + 17px);
  position: absolute;
  top: 30%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  @media (min-width: 768px) {
    top: 40%;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    top: 30%;
  }
  @media (min-width: 1024px) {
    top: 35%;
  }
  @media (min-width: 1400px) {
    top: 25%;
  }
`;

const StyledNESContainer = styled.div`
  height: 15vh;
  background: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 340px) {
    margin-bottom: 2rem !important;
  }
  @media (max-width: 767px) {
    max-width: 100px;
    max-height: 10vh;
  }
  @media (min-width: 768px) {
    min-width: 150px;
    max-height: 10vh;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    max-height: 25vh;
    height: 25vh;
    margin-bottom: 2rem !important;
  }
  @media (min-width: 1024px) {
    min-width: 220px;
    max-height: 15vh;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  align-self: flex-start;
  white-space: nowrap;
`;

const InkyDoodle = (props) => {
  const {
    parentInkyDoodles,
    changeLeftTreeLeftParent,
    changeLeftTreeRightParent,
    changeRightTreeLeftParent,
    changeRightTreeRightParent,
    leftLeft,
    leftRight,
    rightLeft,
    leftGen2,
    rightGen2,
    gen3,
    leftGen2Loading,
    rightGen2Loading,
    gen3Loading,
    gen2Identifier,
    gen3Identifier,
  } = props;

  const [value, changeValue] = useState("");

  const override = css`
    position: absolute;
    top: 35%;
    left: 0;
    right: 0;
    margin: 0 auto;
  `;

  useEffect(() => {
    if (value) {
      if (leftLeft) {
        changeLeftTreeLeftParent(value);
      } else if (leftRight) {
        changeLeftTreeRightParent(value);
      } else if (rightLeft) {
        changeRightTreeLeftParent(value);
      } else {
        changeRightTreeRightParent(value);
      }
    }
  }, [
    leftLeft,
    leftRight,
    rightLeft,
    value,
    changeLeftTreeLeftParent,
    changeLeftTreeRightParent,
    changeRightTreeLeftParent,
    changeRightTreeRightParent,
  ]);

  useEffect(() => {
    const nesDropdown = document.getElementsByTagName("INPUT");

    if (nesDropdown) {
      Array.from(nesDropdown).forEach((el) => {
        el.setAttribute("readonly");
      });
    }
  }, []);

  return (
    <StyledContainer>
      <StyledNESContainer
        className={`nes-container is-rounded with-title ${
          !gen2Identifier && !gen3Identifier ? "gen1_parents" : null
        }`}
        style={{
          marginBottom: "3rem",
          background: gen2Identifier
            ? leftGen2 || rightGen2
              ? "#fff"
              : "rgb(160, 160, 160)"
            : gen3Identifier
            ? gen3
              ? "#fff"
              : "rgb(160, 160, 160)"
            : "#fff",
        }}
      >
        <StyledTitle
          gen2Identifier={gen2Identifier}
          gen3Identifier={gen2Identifier}
          leftGen2={leftGen2}
          rightGen2={leftGen2}
          gen3={gen3}
          className="title"
          style={{
            fontSize: "0.6rem",
            background: gen2Identifier
              ? leftGen2 || rightGen2
                ? "#fff"
                : "rgb(160, 160, 160)"
              : gen3Identifier
              ? gen3
                ? "#fff"
                : "rgb(160, 160, 160)"
              : "#fff",
          }}
        >
          {gen2Identifier ? "Gen. 2" : gen3Identifier ? "Gen. 3" : "Gen. 1"}
        </StyledTitle>
        {leftGen2Loading || rightGen2Loading || gen3Loading ? (
          <ClipLoader loading={true} css={override} size={50} />
        ) : value ? (
          <StyledImage src={value.imageURL} alt={value.name} />
        ) : leftGen2 ? (
          <StyledImage
            src={
              leftGen2.image
                ? leftGen2.image.url
                : leftGen2.imageURL
                ? leftGen2.imageURL
                : null
            }
            alt={
              leftGen2.name
                ? leftGen2.name
                : leftGen2.label
                ? leftGen2.label
                : null
            }
          />
        ) : rightGen2 ? (
          <StyledImage
            src={
              rightGen2.image
                ? rightGen2.image.url
                : rightGen2.imageURL
                ? rightGen2.imageURL
                : null
            }
            alt={
              rightGen2.name
                ? rightGen2.name
                : rightGen2.label
                ? rightGen2.label
                : null
            }
          />
        ) : gen3 ? (
          gen3 === "No Match" ? (
            <StyledX>X</StyledX>
          ) : (
            <StyledImage
              src={
                gen3.image
                  ? gen3.image.url
                  : gen3.imageURL
                  ? gen3.imageURL
                  : null
              }
              alt={gen3.name ? gen3.name : gen3.label ? gen3.label : null}
            />
          )
        ) : null}
      </StyledNESContainer>
      {!parentInkyDoodles ? (
        <div
          className="nes-container is-rounded"
          style={{
            margin: "0",
            padding: ".5rem 1rem",
            fontSize: "0.8rem",
            boxShadow:
              "0 4px #212529, 0 -4px #212529, 4px 0 #212529, -4px 0 #212529",
            background: "#fff",
            textAlign: "center",
            minWidth: "220px",
            maxWidth: "300px",
          }}
        >
          {leftGen2 ? (
            leftGen2.name ? (
              leftGen2.name
            ) : leftGen2.label ? (
              leftGen2.label
            ) : null
          ) : rightGen2 ? (
            rightGen2.name ? (
              rightGen2.name
            ) : rightGen2.label ? (
              rightGen2.label
            ) : null
          ) : gen3 ? (
            gen3 === "No Match" ? (
              <p style={{ color: "red" }}>No Match</p>
            ) : gen3.name ? (
              gen3.name
            ) : gen3.label ? (
              gen3.label
            ) : (
              <p style={{ color: "hsl(0, 0%, 50%)", fontWeight: 600 }}>None</p>
            )
          ) : (
            <p style={{ color: "hsl(0, 0%, 50%)", fontWeight: 600 }}>None</p>
          )}
        </div>
      ) : (
        <Select
          styles={nesTheme}
          value={value}
          onChange={changeValue}
          isSearchable={false}
          options={
            parentInkyDoodles
              ? parentInkyDoodles.length > 0
                ? parentInkyDoodles.map((item, i) => {
                    return {
                      value: i,
                      label: item.name,
                      imageURL: item.image.url,
                    };
                  })
                : []
              : []
          }
        />
      )}
    </StyledContainer>
  );
};

export default InkyDoodle;
