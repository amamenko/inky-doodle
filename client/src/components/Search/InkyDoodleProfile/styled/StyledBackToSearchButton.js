import styled from "styled-components";

export const StyledBackToSearchButton = styled.button`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    ::after {
      content: "";
      height: 5rem;
      box-shadow: none;
    }
  }

  @media (min-width: 768px) {
    width: 84%;
  }
`;
