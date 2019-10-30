import React from "react";
import PropTypes from "prop-types";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import SubmitButton from "./SubmitButton";

import "./styles.css";

const ButtonBar = ({ onClickLeft, onClickRight, rightButton }) => {
  return (
    <div className="buttonBar">
      <PrevButton onClick={onClickLeft} />
      {rightButton === "default" && <NextButton onClick={onClickRight} />}
      {rightButton === "submit" && <SubmitButton onClick={onClickRight} />}
    </div>
  );
};

ButtonBar.propTypes = {
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
  rightButton: PropTypes.string
};

ButtonBar.defaultProps = {
  rightButton: "default"
};

export default ButtonBar;
