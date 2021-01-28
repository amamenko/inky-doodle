import React, { useState } from "react";
import InkyDoodle from "./InkyDoodle";

const RightParents = (props) => {
  const { parentInkyDoodles } = props;

  const [leftChild, changeLeftChild] = useState({});
  const [rightChild, changeRightChild] = useState({});

  return (
    <>
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        leftChild={leftChild}
        changeLeftChild={changeLeftChild}
      />
      <InkyDoodle
        parentInkyDoodles={parentInkyDoodles}
        rightChild={leftChild}
        changeRightChild={changeLeftChild}
      />
    </>
  );
};

export default RightParents;
