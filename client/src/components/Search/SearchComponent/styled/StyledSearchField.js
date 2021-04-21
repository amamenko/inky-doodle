import styled from "styled-components";

export const StyledSearchField = styled.div`
  font-size: 0.8rem;
  width: 75%;
  margin-top: 2rem;
  input {
    color: #000 !important;
    caret-color: #000 !important;
  }
  @media (min-width: 1200px) {
    width: 40%;
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  @media (min-width: 1024px) and (max-width: 1400px) {
    width: 55%;
  }
`;
