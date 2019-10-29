/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

const Review = ({
  meal,
  people,
  restaurant,
  dish,
  servings,
  handleGoToPrevious,
  handleSubmit
}) => {
  return (
    <div className="review">
      <div>
        <div>Meal</div>
        <div>{meal}</div>
      </div>
      <div>
        <div>No. of people</div>
        <div>{people}</div>
      </div>
      <div>
        <div>Restaurant</div>
        <div>{restaurant}</div>
      </div>
      <div>
        <div>Dishes</div>
        <div>
          {dish.map((dishName, index) => {
            return (
              <div key={dishName}>{`${dishName} - ${servings[index]}`}</div>
            );
          })}
          ;
        </div>
      </div>
      <div>
        <button
          className="prevButton"
          type="submit"
          onClick={() => handleGoToPrevious()}
        >
          Prev
        </button>
        <button className="submit" type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

Review.propTypes = {
  meal: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  restaurant: PropTypes.string.isRequired,
  dish: PropTypes.arrayOf(PropTypes.string).isRequired,
  servings: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleGoToPrevious: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Review;
