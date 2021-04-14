import styled from "styled-components";

export const StyledDescriptionLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem 0.5rem;
  background: #fff;

  & > p:first-child {
    color: rgb(100, 100, 100);
  }

  & > p:nth-child(2) {
    padding-left: 0.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0.5rem 1rem;
  }
`;
