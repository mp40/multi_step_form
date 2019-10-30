import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const PrevButton = ({ onClick }) => {
  return (
    <button type="submit" className="prevButton" onClick={() => onClick()}>
      Prev
    </button>
  );
};

PrevButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default PrevButton;
