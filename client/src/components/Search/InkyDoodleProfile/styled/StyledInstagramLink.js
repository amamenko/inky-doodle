import styled from "styled-components";

export const StyledInstagramLink = styled.button`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  max-height: 2.5rem;
  margin: 1rem 0;
  width: 75%;

  & > p {
    font-size: 0.8rem;
    margin: 0 !important;
    padding: 0 1rem;
  }

  @media (min-width: 600px) {
    width: 44%;
  }

  @media (min-width: 768px) {
    width: 84%;
  }
`;
