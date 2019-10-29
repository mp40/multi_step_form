/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import showValidDishes from "./data";

const createKey = (dish, index) => {
  return `${dish}${index}`;
};

const getTotalServings = servings => {
  return servings.reduce((acc, amount) => {
    return acc + amount;
  }, 0);
};

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDishError: false,
      showServingsError: false
    };

    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.handleAddDish = this.handleAddDish.bind(this);
    this.handleServingChange = this.handleServingChange.bind(this);
    this.handleNextIsValid = this.handleNextIsValid.bind(this);
  }

  handleDishSelect(event, index) {
    const { dish, handleUpdateStateValue } = this.props;

    if (dish.includes(event.target.value)) {
      this.setState({ showDishError: "Error: Please select different dish" });
    } else {
      const updatedDish = dish.map((dishName, dex) => {
        return index === dex ? event.target.value : dishName;
      });
      handleUpdateStateValue("dish", updatedDish);
    }
  }

  handleAddDish() {
    const { dish, handleUpdateStateValue } = this.props;
    if (dish.includes("---")) {
      this.setState({ showDishError: "Error: Please select a dish" });
    } else {
      handleUpdateStateValue("dish", [...dish, "---"]);
    }
  }

  handleServingChange(event, index) {
    const { servings, handleUpdateStateValue } = this.props;
    const serving = event.target.value;
    const updatedServing = servings.map((serves, dex) => {
      return index === dex ? serving : serves;
    });
    handleUpdateStateValue("servings", updatedServing);
  }

  handleNextIsValid() {
    const { people, dish, servings, handleGoToNext } = this.props;
    if (dish.includes("---")) {
      this.setState({ showDishError: "Error: Please select a dish" });
    } else if (
      getTotalServings(servings) > 10 ||
      getTotalServings(servings) < people
    ) {
      this.setState({ showServingsError: true });
    } else {
      handleGoToNext();
    }
  }

  render() {
    const { showDishError, showServingsError } = this.state;
    const {
      restaurant,
      people,
      dish,
      servings,
      handleGoToPrevious
    } = this.props;
    return (
      <div>
        <form>
          Please select a dish
          {dish.map((dishType, index) => {
            return (
              <div key={createKey(dishType, index)}>
                <label>
                  <select
                    className="selectDish"
                    value={dishType}
                    onChange={event => this.handleDishSelect(event, index)}
                  >
                    {["---", ...showValidDishes(restaurant)].map(dishes => {
                      return <option key={dishes}>{dishes}</option>;
                    })}
                  </select>
                </label>
                <div>
                  Please select number of servings
                  <input
                    className="servingQty"
                    type="number"
                    name="quantity"
                    min="1"
                    max="10"
                    value={servings[index]}
                    onChange={event => this.handleServingChange(event, index)}
                  />
                </div>
              </div>
            );
          })}
        </form>
        <div>
          <button
            className="addDish"
            type="button"
            onClick={() => this.handleAddDish()}
          >
            +
          </button>
        </div>
        {showDishError && <p>{showDishError}</p>}
        {showServingsError && getTotalServings(servings) > 10 && (
          <p>Too many servings, maximum is ten</p>
        )}
        {showServingsError && getTotalServings(servings) < people && (
          <p>Not enough servings, minimum is one per person</p>
        )}
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

SelectDish.propTypes = {
  restaurant: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  dish: PropTypes.arrayOf(PropTypes.string).isRequired,
  servings: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired,
  handleGoToPrevious: PropTypes.func.isRequired
};

export default SelectDish;
