/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */

import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const DropDownSelect = ({
  heading,
  name,
  value,
  handleUpdate,
  handleUpdateKey,
  contents
}) => {
  return (
    <>
      <div>{heading}</div>
      <form>
        <label>
          <select
            className={name}
            value={value}
            onChange={event =>
              handleUpdate(handleUpdateKey, event.target.value)
            }
          >
            {contents()}
          </select>
        </label>
      </form>
    </>
  );
};

DropDownSelect.propTypes = {
  heading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateKey: PropTypes.string.isRequired,
  contents: PropTypes.func.isRequired
};

export default DropDownSelect;
