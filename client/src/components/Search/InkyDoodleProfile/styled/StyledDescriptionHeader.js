import styled from "styled-components";

export const StyledDescriptionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(235, 235, 235);
  width: 100%;
  padding-top: 1rem;

  p {
    font-size: 0.6rem !important;
    display: flex;
    align-self: center;
    color: #005fa3;
  }

  @media (min-width: 1024px) {
    p {
      font-size: 0.8rem !important;
    }
  }
`;
