import styled from "styled-components";

export const StyledProfileDescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background: #fff;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  color: #000;
  border-top: 1px solid rgba(150, 150, 150, 0.3);
  font-size: 0.55rem;

  @media (min-width: 1200px) {
    font-size: 0.8rem;
  }
`;
