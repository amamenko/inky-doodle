import styled from "styled-components";

export const StyledHeadingTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  text-align: center;
  font-size: 0.6rem; 

  @media (min-width: 400px) {
      font-size: 0.7rem;
  }

  @media (min-width: 768px) {
      font-size: 1rem;
  }

  @media (min-width: 1024px) {
      font-size: 1.4rem;
  }

  @media (min-width: 1200px) {
            font-size: 1.1rem;
  }

  @media (min-width: 1600px) {
      font-size: 1.4rem;
  }
`;