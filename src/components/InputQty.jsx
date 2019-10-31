import React from "react";
import PropTypes from "prop-types";

const InputQty = ({ value, handleUpdate, handleUpdateKey }) => {
  return (
    <input
      type="number"
      name="quantity"
      min="1"
      max="10"
      value={value}
      onChange={event => handleUpdate(handleUpdateKey, event.target.value)}
    />
  );
};

InputQty.propTypes = {
  value: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateKey: PropTypes.string.isRequired
};

export default InputQty;
