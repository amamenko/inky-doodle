import React, { useState, useEffect } from "react";
import Select from "react-select";
import nesTheme from "react-select-nes-css-theme";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import "nes.css/css/nes.min.css";

const StyledContainer = styled.div`
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
  top: 25%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const StyledNESContainer = styled.div`
  height: 15vh;
  background: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 100px;
    max-height: 10vh;
  }
  @media (min-width: 769px) {
    min-width: 220px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  align-self: flex-start;
  white-space: nowrap;
`;

const ChildNESContainer = styled.div``;

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

  return (
    <StyledContainer>
      <StyledNESContainer
        className="nes-container is-rounded with-title"
        style={{ marginBottom: "3rem" }}
      >
        <StyledTitle className="title" style={{ fontSize: "0.6rem" }}>
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
