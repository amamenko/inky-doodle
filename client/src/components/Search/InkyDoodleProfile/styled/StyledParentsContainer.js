import styled from "styled-components";

export const StyledParentsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background: #fff;

  @media (min-width: 1024px) {
    justify-content: space-evenly;
  }
`;
