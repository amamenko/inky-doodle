import styled from "styled-components";

export const StyledChildrenOuterContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;

  & > p:first-child {
    display: flex;
    align-self: center;
    color: #005fa3;
  }
`;
