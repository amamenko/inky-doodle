import styled from "styled-components";

export const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: ${(props) => (props.instagram ? "none" : "1px solid #dedede")};
  padding: 1rem 1rem;

  & > p:first-child {
    display: flex;
    align-self: center;
    color: #005fa3;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;
