import React from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import "./ProfileSliderStyles.css";

const StyledProfileTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 1rem;
  }
`;

const StyledImageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const StyledProfileDescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  height: 52%;
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const InkyDoodleProfile = (props) => {
  const {
    inkyDoodleSelected,
    changeInkyDoodleSelected,
    inkyDoodleResult,
  } = props;

  if (inkyDoodleResult) {
    return (
      <Menu
        disableAutoFocus
        isOpen={inkyDoodleSelected}
        onClose={() => changeInkyDoodleSelected("")}
        customCrossIcon={<p>X</p>}
      >
        <StyledProfileTopContainer>
          <h2>{inkyDoodleResult.name}</h2>
          <StyledImageContainer>
            <img
              src={inkyDoodleResult.image.url}
              alt={`${inkyDoodleResult.name}`}
            />
          </StyledImageContainer>
          <h2>{"#" + inkyDoodleResult.number}</h2>
        </StyledProfileTopContainer>
        <StyledProfileDescriptionContainer>
          <p>Text</p>
        </StyledProfileDescriptionContainer>
      </Menu>
    );
  } else {
    return null;
  }
};

export default InkyDoodleProfile;
