import styled from "styled-components";

export const StyledPreviewNumberContainer = styled.p`
  position: absolute;
  left: 0.3rem;
  padding: 0 !important;
  margin: 0 auto;
  z-index: 9;
  font-size: 0.4rem !important;

  @media (min-width: 1200px) {
    left: 1rem;
    font-size: 0.6rem !important;
  }
`;
