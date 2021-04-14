import styled from "styled-components";

export const StyledParentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1024px) {
    justify-content: space-evenly;
  }
`;
