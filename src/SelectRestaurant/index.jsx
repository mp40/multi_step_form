/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import showValidRestaurants from "./data";

class SelectRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };

    this.handleNextIsValid = this.handleNextIsValid.bind(this);
  }

  handleNextIsValid() {
    const { meal, restaurant, handleGoToNext } = this.props;
    if (showValidRestaurants(meal).includes(restaurant)) {
      handleGoToNext();
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { showError } = this.state;
    const {
      meal,
      restaurant,
      handleUpdateStateValue,
      handleGoToPrevious
    } = this.props;
    return (
      <div>
        <form>
          <label>
            Please select a restaurant
            <select
              className="selectRestaurant"
              value={restaurant}
              onChange={event =>
                handleUpdateStateValue("restaurant", event.target.value)
              }
            >
              {["---", ...showValidRestaurants(meal)].map(mealType => {
                return <option key={mealType}>{mealType}</option>;
              })}
            </select>
          </label>
          {showError && <p>Please select valid restaurant</p>}
        </form>
        <div>
          <button
            className="prevButton"
            type="submit"
            onClick={() => handleGoToPrevious()}
          >
            Prev
          </button>
          <button
            className="nextButton"
            type="submit"
            onClick={() => this.handleNextIsValid()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

SelectRestaurant.propTypes = {
  meal: PropTypes.string.isRequired,
  restaurant: PropTypes.string.isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired,
  handleGoToPrevious: PropTypes.func.isRequired
};

export default SelectRestaurant;
