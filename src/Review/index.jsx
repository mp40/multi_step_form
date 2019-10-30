/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

import ButtonBar from "../components/ButtonBar";

const Review = ({
  meal,
  people,
  restaurant,
  dish,
  servings,
  handleGoToPrevious,
  handleSubmit
}) => {
  const showDishes = () => {
    return (
      <>
        {dish.map((dishName, index) => {
          return <div key={dishName}>{`${dishName} - ${servings[index]}`}</div>;
        })}
        ;
      </>
    );
  };

  const showTypeAndSelection = (type, selected) => {
    return (
      <div>
        <div>{type}</div>
        <div>{selected}</div>
      </div>
    );
  };

  return (
    <div className="review">
      {showTypeAndSelection("Meal", meal)}
      {showTypeAndSelection("No. of people", people)}
      {showTypeAndSelection("Restaurant", restaurant)}
      {showTypeAndSelection("Dishes", showDishes())}
      <ButtonBar
        onClickLeft={handleGoToPrevious}
        onClickRight={handleSubmit}
        rightButton="submit"
      />
    </div>
  );
};

Review.propTypes = {
  meal: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  restaurant: PropTypes.string.isRequired,
  dish: PropTypes.arrayOf(PropTypes.string).isRequired,
  servings: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleGoToPrevious: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Review;
