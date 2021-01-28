import React, { useState, useEffect } from "react";
import Select from "react-select";
import nesTheme from "react-select-nes-css-theme";
import styled from "styled-components";
import "nes.css/css/nes.min.css";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  text-align: center;
`;

const StyledImage = styled.img`
  object-fit: contain;
  transform: scale(0.5);
`;

const StyledNESContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 10vh;
  overflow: hidden;
`;

const InkyDoodle = (props) => {
  const {
    parentInkyDoodles,
    leftChild,
    changeLeftChild,
    rightChild,
    changeRightChild,
  } = props;

  const [value, changeValue] = useState("");

  useEffect(() => {
    if (value) {
      if (leftChild) {
        changeLeftChild(value);
      } else {
        if (rightChild) {
          changeRightChild(value);
        }
      }
    }
  }, [changeLeftChild, changeRightChild, leftChild, rightChild, value]);

  return (
    <StyledContainer>
      <StyledNESContainer
        className="nes-container is-rounded"
        style={{ marginBottom: "3rem", padding: "3rem 0rem" }}
      >
        {value ? <StyledImage src={value.imageURL} alt={value.name} /> : null}
      </StyledNESContainer>
      {!parentInkyDoodles ? (
        <div
          className="nes-container is-rounded"
          style={{
            marginBottom: "2rem",
            padding: "0.4rem",
            fontSize: "0.8rem",
          }}
        ></div>
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
