import styled from "styled-components";

export const StyledPreviewContainer = styled.div`
  height: 5rem;
  margin: 1rem;
  background: #fff;
  position: relative;
  width: calc(100% - 6rem);
  &:hover {
    cursor: pointer;
  }
  p {
    padding: 0.5rem 0 0 20%;
    margin: 0;
    font-size: 0.8rem;
    &:last-child {
      position: absolute;
      right: 10%;
    }
  }
  img {
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 10%;
    margin: 0 auto;
    max-height: 2.5rem;
    object-fit: cover;
  }
  @media (max-width: 374px) {
    p {
      font-size: 0.6rem;
      padding: 0.7rem 0 0 25%;
    }
  }
  @media (min-width: 376px) {
    width: calc(100% - 6.5rem);
  }
  @media (min-width: 500px) {
    width: 75%;
  }
  @media (min-width: 768px) {
    height: 7rem;
    img {
      top: 28%;
      left: 4rem;
    }
    p {
      padding: 0.3rem 0 0 30%;
      font-size: 1rem;
    }
  }
  @media (min-width: 1200px) {
    height: 6rem;
    margin: 1rem;
    width: 40%;
  }

  @media (min-width: 1024px) and (max-width: 1400px) {
    width: 55%;
  }

  @media (min-width: 1400px) and (max-height: 750px) {
    height: 5rem;
  }
`;
