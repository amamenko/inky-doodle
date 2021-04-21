import styled from "styled-components";

export const StyledChildrenContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gen > 1 ? "repeat(4, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"};
  text-align: center;
  position: relative;
  width: 100%;
  margin: auto;
  padding-top: 1rem;

  img {
    max-width: 60%;
  }

  & > p:first-child {
    display: flex;
    align-self: center;
    color: #005fa3;
  }

  svg {
    font-size: 1rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: #fff;
    border: 1px solid #dedede;
    path {
      fill: #07c;
    }
  }

  @media (min-width: 768px) {
    svg {
      font-size: 1.5rem;
    }
  }
`;
