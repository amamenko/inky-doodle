import styled from "styled-components";

export const StyledBackToHomeButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: ${(props) => (props.tree ? "8.8rem" : "1rem")};
  font-size: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 1rem;

  svg {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  p {
    padding: 0 0 0 0.6rem;
    margin: 0;
  }

  @media (max-width: 340px) {
    right: ${(props) => (props.tree ? "7.3rem" : "1rem")};
    padding: 0.35rem 0.5rem;
  }

  @media (min-width: 1024px) {
    right: ${(props) => (props.tree ? "14rem" : "1rem")};
    padding: 0.4rem 1rem;
  }
`;
