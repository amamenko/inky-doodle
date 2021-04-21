import { css } from "@emotion/core";

export const override = css`
  position: absolute;
  top: 15%;
  bottom: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;

  @media (min-width: 768px) {
    top: 25%;
    bottom: 25%;
  }

  @media (min-width: 1200px) {
    top: 50%;
    bottom: 50%;
  }

  @media (min-width: 1400px) {
    top: 45%;
    bottom: 45%;
  }

  @media (min-width: 2000px) {
    top: 15%;
    bottom: 15%;
  }
`;
