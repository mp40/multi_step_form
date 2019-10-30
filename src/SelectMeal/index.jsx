import React, { useState } from "react";
import PropTypes from "prop-types";

import NextButton from "../components/NextButton";
import DropDownSelect from "../components/DropDownSelect";
import QuantitySelector from "../components/QuantitySelector";

import { validMeals, dataIsValid } from "./data";

import "./styles.css";

const SelectMeal = ({
  meal,
  people,
  handleUpdateStateValue,
  handleGoToNext
}) => {
  const [error, showError] = useState(false);

  const handleNextIsValid = () => {
    if (dataIsValid(meal)) {
      handleGoToNext();
    } else {
      showError(true);
    }
  };

  const dropDownContents = () => {
    return ["---", ...validMeals].map(mealType => {
      return <option key={mealType}>{mealType}</option>;
    });
  };

  return (
    <div className="selectMealContainer">
      <DropDownSelect
        heading="Please select a meal"
        name="selectMeal"
        value={meal}
        handleUpdate={handleUpdateStateValue}
        handleUpdateKey="meal"
        contents={dropDownContents}
      />
      <QuantitySelector
        heading="Please select number of people"
        value={people}
        handleUpdate={handleUpdateStateValue}
        handleUpdateKey="people"
      />
      <div>
        <NextButton onClick={handleNextIsValid} />
      </div>
      {error && <p>Please select valid meal</p>}
    </div>
  );
};

SelectMeal.propTypes = {
  meal: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired
};

export default SelectMeal;
