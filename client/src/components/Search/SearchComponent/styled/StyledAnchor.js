import styled from "styled-components";

export const StyledAnchor = styled.a`
  align-self: flex-start;
  height: 5vh;
  display: block;
  position: relative;
  width: 100px;
  margin-top: 1rem;
  margin-left: 1rem;
  @media (max-width: 330px) {
    margin-left: 0.5rem;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    margin-top: 0.5rem;
    margin-left: 0rem;
  }
`;
