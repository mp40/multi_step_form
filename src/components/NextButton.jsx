import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const NextButton = ({ onClick }) => {
  return (
    <button type="submit" className="nextButton" onClick={() => onClick()}>
      Next
    </button>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NextButton;
