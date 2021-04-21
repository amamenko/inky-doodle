import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  width: 80%;
  max-width: 50rem;
  
  svg {
      font-size: 1.3rem;
      position: absolute;
      left: 1.5rem;
      margin: 0 auto;
  }


  @media (max-width: 414px) {

    svg {
        
      bottom: 1.3rem;
    }

  button {
      font-size: 0.6rem;
  }
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 40%;
  }
`;