import styled from "styled-components";

export const StyledIndividualChildContainer = styled.div`
  position: relative;
  border: 1px solid rgb(230, 230, 230);
  overflow: hidden;
  background: #fff;

  p {
    font-size: 0.4rem;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 1024px) {
    p {
      font-size: 0.55rem;
    }

    &:hover {
      background: rgb(200, 200, 200);
      transition: background 0.2s ease;
    }
  }
`;
