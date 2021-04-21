import styled from "styled-components";

export const StyledFamilyOuterContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => (props.top ? "1rem" : 0)};
  position: relative;
  z-index: 999;

  & > p:first-child {
    font-size: 0.6rem !important;
    display: flex;
    align-self: center;
    color: #005fa3;
  }
`;
