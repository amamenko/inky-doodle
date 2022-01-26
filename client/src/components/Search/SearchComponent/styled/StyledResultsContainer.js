import styled from "styled-components";

export const StyledResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;
  @media (min-width: 1200px) {
    top: 15rem;
  }
  @media (min-width: 1400px) and (max-height: 750px) {
    margin-top: 7rem;
    top: 0;
  }
  @media (min-width: 2000px) {
    margin: 5rem 0;
    position: absolute;
  }
`;
