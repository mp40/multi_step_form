import React from "react";
import PropTypes from "prop-types";

import InputQty from "./InputQty";

import "./styles.css";

const QuantitySelector = ({
  heading,
  value,
  handleUpdate,
  handleUpdateKey
}) => {
  return (
    <>
      <div>{heading}</div>
      <InputQty
        value={value}
        onChange={event => handleUpdate(handleUpdateKey, event.target.value)}
      />
    </>
  );
};

QuantitySelector.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateKey: PropTypes.string.isRequired
};

export default QuantitySelector;
