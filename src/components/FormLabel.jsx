/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */

import React from "react";
import PropTypes from "prop-types";

const FormLabel = ({
  name,
  value,
  handleUpdate,
  handleUpdateKey,
  contents
}) => {
  return (
    <label>
      <select
        className={name}
        value={value}
        onChange={event => handleUpdate(handleUpdateKey, event.target.value)}
      >
        {contents()}
      </select>
    </label>
  );
};

FormLabel.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  contents: PropTypes.func.isRequired
};

export default FormLabel;
