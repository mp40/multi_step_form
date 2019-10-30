/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */

import React from "react";
import PropTypes from "prop-types";

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
      <input
        type="number"
        name="quantity"
        min="1"
        max="10"
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

{
  /* <div>Please select number of people</div>
<input
  type="number"
  name="quantity"
  min="1"
  max="10"
  value={people}
  onChange={event =>
    handleUpdateStateValue("people", event.target.value)
  }
/>
</div> */
}
