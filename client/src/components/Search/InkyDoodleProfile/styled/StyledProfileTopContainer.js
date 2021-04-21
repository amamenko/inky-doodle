import styled from "styled-components";

export const StyledProfileTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  text-align: center;
  background: #fff;
  padding: 1rem 0;
  position: relative;
  z-index: 999;

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
