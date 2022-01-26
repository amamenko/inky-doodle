import styled from "styled-components";

export const StyledSearchPageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 1200px) {
    height: 75vh;
  }

  @media (min-width: 1900px) {
    height: 85vh;
  }

  @media (min-width: 1950px) {
    height: 75vh;
  }

  @media (min-width: 1200px) and (max-width: 2000px) and (max-height: 1000px) {
    height: 90vh;
  }

  @media (min-width: 1200px) and (max-width: 1700px) and (max-height: 900px) {
    height: 100vh;
  }

  @media (min-width: 1200px) and (max-width: 2000px) and (max-height: 750px) {
    position: fixed;
    height: 135vh;
  }

  @media (min-width: 1400px) and (max-height: 750px) {
    height: 100vh;
  }
`;
