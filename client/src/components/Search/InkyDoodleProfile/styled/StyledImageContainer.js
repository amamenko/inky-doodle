import styled from "styled-components";

export const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  background: transparent;
  width: 100%;
  @media (max-width: 374px) {
    img {
      height: 4rem;
    }
  }
  @media (max-width: 768px) {
    img {
      height: 5rem;
    }
  }
  @media (min-width: 0px) and (orientation: landscape) {
    img {
      height: 4rem;
    }
  }
  @media (min-width: 1200px) and (orientation: landscape) {
    img {
      height: auto;
    }
  }
`;
