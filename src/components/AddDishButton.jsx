import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const AddDishButton = ({ onClick }) => {
  return (
    <button className="addDish" type="button" onClick={() => onClick()}>
      +
    </button>
  );
};

AddDishButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AddDishButton;
