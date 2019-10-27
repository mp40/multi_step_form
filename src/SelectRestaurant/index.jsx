/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import showValidRestaurants from "./data";

class SelectRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: "---",
      showError: false
    };

    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
  }

  handleRestaurantChange(event) {
    const restaurant = event.target.value;
    this.setState({ restaurant });
  }

  submitData() {
    const { restaurant } = this.state;
    const { meal, handleUpdateRestaurant } = this.props;
    if (showValidRestaurants(meal).includes(restaurant)) {
      handleUpdateRestaurant(restaurant);
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { restaurant, showError } = this.state;
    const { meal, handleGoToPrevious } = this.props;
    return (
      <div>
        <form>
          <label>
            Please select a restaurant
            <select
              className="selectRestaurant"
              value={restaurant}
              onChange={this.handleRestaurantChange}
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
            onClick={() => this.submitData()}
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
  handleUpdateRestaurant: PropTypes.func.isRequired,
  handleGoToPrevious: PropTypes.func.isRequired
};

export default SelectRestaurant;
