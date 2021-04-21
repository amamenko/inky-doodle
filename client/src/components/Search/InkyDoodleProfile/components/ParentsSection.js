import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { StyledFamilyOuterContainer } from "../styled/StyledFamilyOuterContainer";
import { StyledParentsContainer } from "../styled/StyledParentsContainer";
import { StyledIndividualParentContainer } from "../styled/StyledIndividualParentContainer";
import { StyledDescriptionHeader } from "../styled/StyledDescriptionHeader";

const ParentsSection = (props) => {
  const {
    currentInkyDoodle,
    currentInkyDoodleParents,
    handleParentOrChildClick,
  } = props;

  return (
    <StyledFamilyOuterContainer top>
      <StyledDescriptionHeader>
        <p>Parents</p>
      </StyledDescriptionHeader>
      <StyledParentsContainer>
        <StyledIndividualParentContainer
          onClick={() =>
            currentInkyDoodle.generation > 1
              ? handleParentOrChildClick(currentInkyDoodleParents[0])
              : null
          }
          className={currentInkyDoodle.generation > 1 ? "nes-pointer" : null}
          linked={currentInkyDoodle.generation > 1}
        >
          {currentInkyDoodleParents[0] ? (
            <>
              <p>{currentInkyDoodleParents[0].name}</p>
              <img
                src={currentInkyDoodleParents[0].image.url}
                alt={currentInkyDoodleParents[0].name}
              />
              {currentInkyDoodle.generation > 1 ? (
                <MdSubdirectoryArrowRight />
              ) : null}
            </>
          ) : (
            <ClipLoader loading={true} size={40} />
          )}
        </StyledIndividualParentContainer>
        <StyledIndividualParentContainer
          right
          onClick={() =>
            currentInkyDoodle.generation > 1
              ? handleParentOrChildClick(currentInkyDoodleParents[1])
              : null
          }
          className={currentInkyDoodle.generation > 1 ? "nes-pointer" : null}
          linked={currentInkyDoodle.generation > 1}
        >
          {currentInkyDoodleParents[1] ? (
            <>
              <p>{currentInkyDoodleParents[1].name}</p>
              <img
                src={currentInkyDoodleParents[1].image.url}
                alt={currentInkyDoodleParents[1].name}
              />
              {currentInkyDoodle.generation > 1 ? (
                <MdSubdirectoryArrowRight />
              ) : null}
            </>
          ) : (
            <ClipLoader loading={true} size={40} />
          )}
        </StyledIndividualParentContainer>
      </StyledParentsContainer>
    </StyledFamilyOuterContainer>
  );
};

export default ParentsSection;
