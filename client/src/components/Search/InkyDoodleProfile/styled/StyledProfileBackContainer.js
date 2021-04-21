import styled from "styled-components";

export const StyledProfileBackContainer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 16px;
  top: 8px;
  background: transparent;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;
  color: #07c;
  border: 1px solid #07c;
  border-radius: 20px;
  font-size: 0.8rem;
  p {
    margin: 0;
    padding: 0 0 0 0.5rem;
    font-size: 0.5rem;
  }
  @media (min-width: 768px) {
    p {
      margin: 0;
      padding: 0 0 0 0.5rem;
      font-size: 0.8rem;
    }
  }
`;
