import React from "react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { StyledChildrenContainer } from "../styled/StyledChildrenContainer";
import { StyledIndividualChildContainer } from "../styled/StyledIndividualChildContainer";
import { StyledFamilyOuterContainer } from "../styled/StyledFamilyOuterContainer";
import { StyledDescriptionHeader } from "../styled/StyledDescriptionHeader";

const ChildrenSection = (props) => {
  const {
    currentInkyDoodle,
    currentInkyDoodleChildren,
    handleParentOrChildClick,
  } = props;

  return (
    <StyledFamilyOuterContainer>
      <StyledDescriptionHeader>
        <p>Children</p>
      </StyledDescriptionHeader>
      <StyledChildrenContainer gen={currentInkyDoodle.generation}>
        {currentInkyDoodleChildren.map((child) => (
          <StyledIndividualChildContainer
            key={child.number}
            className="nes-pointer"
            onClick={() => handleParentOrChildClick(child)}
          >
            <p>{child.name}</p>
            <img src={child.image.url} alt={child.name} />
            {child.generation > 1 ? <MdSubdirectoryArrowRight /> : null}
          </StyledIndividualChildContainer>
        ))}
      </StyledChildrenContainer>
    </StyledFamilyOuterContainer>
  );
};

export default ChildrenSection;
