import styled from "styled-components";

export const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: ${(props) => (props.instagram ? "none" : "1px solid #dedede")};
  padding-top: ${(props) =>
    props.instagram && props.anyChildren ? "1rem" : 0};

  p {
    padding-left: 0 1rem;
  }

  .profile_header_section {
    background: rgb(235, 235, 235);
    width: 100%;
    text-align: center;
    padding-top: 1rem;

    p:first-child {
      font-size: 0.6rem !important;
      color: #005fa3;

      @media (min-width: 1024px) {
        font-size: 0.8rem !important;
      }
    }
  }

  .profile_desciption_content {
    padding: 1rem 1rem 0 1rem;
  }
`;
