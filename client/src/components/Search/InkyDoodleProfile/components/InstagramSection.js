import React from "react";
import { StyledInstagramLink } from "../styled/StyledInstagramLink";
import { StyledSectionContainer } from "../styled/StyledSectionContainer";
import { StyledDescriptionLine } from "../styled/StyledDescriptionLine";
import dayjs from "dayjs";

const InstagramSection = (props) => {
  const { currentInkyDoodle } = props;

  const handleInstagramPostClick = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <StyledSectionContainer
      instagram={true}
      anyChildren={currentInkyDoodle.generation < 3}
    >
      <span className="profile_header_section">
        <p>Instagram</p>
      </span>
      <div className="profile_desciption_content">
        <StyledDescriptionLine>
          <p>
            <b>Posted:</b>
          </p>
          <p>{currentInkyDoodle.instagram ? "Yes" : "No"}</p>
        </StyledDescriptionLine>
        <StyledDescriptionLine>
          <p>
            <b>{currentInkyDoodle.instagram ? `Date:` : `Scheduled:`}</b>
          </p>
          <p>
            {currentInkyDoodle.instagram
              ? `${currentInkyDoodle.instagram.date}`
              : `${dayjs("February 7, 2021")
                  .add(currentInkyDoodle.number + 1, "day")
                  .format("MMMM D, YYYY")} `}
          </p>
        </StyledDescriptionLine>
      </div>
      {currentInkyDoodle.instagram ? (
        <StyledInstagramLink
          className="nes-btn is-primary"
          onClick={(e) =>
            handleInstagramPostClick(e, currentInkyDoodle.instagram.url)
          }
        >
          <p>View Post</p>
        </StyledInstagramLink>
      ) : null}
    </StyledSectionContainer>
  );
};

export default InstagramSection;
