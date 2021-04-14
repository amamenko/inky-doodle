import styled from "styled-components";

export const StyledIndividualParentContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 1rem;
  text-align: center;
  border: 1px solid rgba(150, 150, 150, 0.3);
  height: 10rem;
  width: 100%;
  svg {
    font-size: 1rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    path {
      fill: rgb(90, 90, 90);
    }
  }
  & > p:first-child {
    color: rgb(100, 100, 100);
  }
  img {
    max-height: 3rem;
  }
  & > span {
    padding: 1.4rem;
  }
  @media (min-width: 1024px) {
    &:hover {
      background: ${(props) => (props.linked ? "rgb(200, 200, 200)" : "#fff")};
      transition: background 0.2s ease;
    }
  }
  @media (min-width: 1200px) {
    height: 15rem;
    svg {
      font-size: 2rem;
    }
    img {
      max-height: 5rem;
    }
    & > span {
      padding: 2.5rem;
    }
  }
`;
