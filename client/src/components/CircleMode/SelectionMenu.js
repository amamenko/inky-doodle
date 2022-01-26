import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { StyledProfileMenuXButton } from "../Search/InkyDoodleProfile/styled/StyleProfileMenuXButton";
import styled from "styled-components";
import "../Search/InkyDoodleProfile/ProfileSliderStyles.css";
import "./CircleMode.css";

const StyledMenuContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 1rem;
  position: relative;
  border-bottom: 1px solid #dedede;
  padding: 1rem;
  background: ${(props) =>
    props.selected === props.name ? "#dedede" : "#fff"};

  h3 {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    margin-left: 1rem;
    padding-right: 1rem;
    color: #000;
  }
`;

const StyledMenuImage = styled.img`
  width: 30%;
  border-right: ${(props) => `3px solid ${props.color}`};
  padding-right: 1rem;

  @media only screen and (min-width: 1400px) and (max-height: 700px) {
    width: 20%;
  }
`;

const SelectionMenu = (props) => {
  const {
    selectingGen1,
    changeSelectingGen1,
    availableGen1,
    changeTopLeftGen1,
    changeTopRightGen1,
    changeBottomGen1,
  } = props;

  const [selected, changeSelected] = useState("");

  const handleItemClick = (item) => {
    if (selectingGen1 === "left") {
      changeTopLeftGen1(item);
    } else if (selectingGen1 === "right") {
      changeTopRightGen1(item);
    } else {
      changeBottomGen1(item);
    }

    changeSelected(item.name);
    changeSelectingGen1(false);
    setTimeout(() => {
      changeSelected("");
    }, 500);
  };

  return (
    <Menu
      disableAutoFocus
      isOpen={selectingGen1 ? true : false}
      onClose={() => changeSelectingGen1(false)}
      customCrossIcon={false}
      right
    >
      <StyledProfileMenuXButton
        type="button"
        className="nes-btn is-error"
        onClick={() => changeSelectingGen1(false)}
      >
        X
      </StyledProfileMenuXButton>
      <div>
        {availableGen1 &&
          availableGen1
            .sort((a, b) => a.number - b.number)
            .map((item, i) => {
              return (
                <StyledMenuContainer
                  className="side_menu_item"
                  key={i}
                  onClick={() => handleItemClick(item)}
                  selected={selected}
                  name={item.name}
                >
                  <StyledMenuImage src={item.image.url} color={item.color} />
                  <h3>{item.name}</h3>
                </StyledMenuContainer>
              );
            })}
      </div>
    </Menu>
  );
};

export default SelectionMenu;
