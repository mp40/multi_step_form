import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const SubmitButton = ({ onClick }) => {
  return (
    <button type="submit" className="submit" onClick={() => onClick()}>
      Submit
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SubmitButton;
