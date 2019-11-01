import React from "react";
import PropTypes from "prop-types";

import FormLabel from "./FormLabel";

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
        <FormLabel
          name={name}
          value={value}
          handleUpdate={handleUpdate}
          handleUpdateKey={handleUpdateKey}
          contents={contents}
        />
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
