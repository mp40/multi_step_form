import React, { useState } from "react";
import PropTypes from "prop-types";

import ButtonBar from "../components/ButtonBar";
import DropDownSelect from "../components/DropDownSelect";

import showValidRestaurants from "./data";

import "./styles.css";

const SelectRestaurant = ({
  meal,
  restaurant,
  handleUpdateStateValue,
  handleGoToNext,
  handleGoToPrevious
}) => {
  const [error, showError] = useState(false);

  const handleNextIsValid = () => {
    if (showValidRestaurants(meal).includes(restaurant)) {
      handleGoToNext();
    } else {
      showError(true);
    }
  };

  const dropDownContents = () => {
    return ["---", ...showValidRestaurants(meal)].map(mealType => {
      return <option key={mealType}>{mealType}</option>;
    });
  };

  return (
    <div className="selectRestaurantContainer">
      <DropDownSelect
        heading="Please select a restaurant"
        name="selectRestaurant"
        value={restaurant}
        handleUpdate={handleUpdateStateValue}
        handleUpdateKey="restaurant"
        contents={dropDownContents}
      />
      {error && <p>Please select valid restaurant</p>}
      <ButtonBar
        onClickLeft={handleGoToPrevious}
        onClickRight={handleNextIsValid}
      />
    </div>
  );
};

SelectRestaurant.propTypes = {
  meal: PropTypes.string.isRequired,
  restaurant: PropTypes.string.isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired,
  handleGoToPrevious: PropTypes.func.isRequired
};

export default SelectRestaurant;
