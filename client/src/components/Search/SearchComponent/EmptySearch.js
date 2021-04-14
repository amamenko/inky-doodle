import React from "react";
import PadushkaBlack from "../../../images/PadushkaBlack.png";
import styled from "styled-components";

const StyledEmptyStateImage = styled.img`
  opacity: 0.3;
  padding: 4rem 0;

  @media (min-width: 768px) {
    padding: 2rem 0;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }

  @media (min-width: 1200px) {
    width: 60%;
  }
`;

const StyledEmptyStateContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgb(100, 100, 100);
  width: 80%;

  @media (min-width: 1200px) {
    width: 40%;
  }

  @media (min-width: 1400px) {
    width: 25%;
  }
`;

const EmptySearch = () => {
  return (
    <StyledEmptyStateContainer>
      <StyledEmptyStateImage src={PadushkaBlack} alt={"No input entered"} />
      <p>Enter an Inky Doodle's name or number to get started!</p>
    </StyledEmptyStateContainer>
  );
};

export default EmptySearch;
