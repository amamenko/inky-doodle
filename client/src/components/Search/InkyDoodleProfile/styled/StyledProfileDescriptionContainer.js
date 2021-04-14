import styled from "styled-components";

export const StyledProfileDescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  height: 68%;
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #000;
  border-top: 1px solid rgb(150, 150, 150);
  font-size: 0.55rem;
  @media (min-width: 0px) and (orientation: landscape) {
    height: 35%;
  }
  @media (min-width: 500px) and (orientation: portrait) {
    height: 80%;
  }
  @media (min-width: 768px) and (orientation: portrait) {
    height: 75%;
    font-size: 1rem;
  }
  @media (min-width: 1200px) {
    height: 75%;
    font-size: 1rem;
  }
  @media (min-width: 2000px) {
    height: 75%;
  }
`;
