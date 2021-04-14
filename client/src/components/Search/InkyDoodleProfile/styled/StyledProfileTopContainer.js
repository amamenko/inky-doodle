import styled from "styled-components";

export const StyledProfileTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  h2 {
    font-size: 1rem;
    color: #000;
    margin-top: 0.5rem;
  }
  @media (max-width: 374px) {
    h2 {
      font-size: 0.8rem;
    }
  }
`;
