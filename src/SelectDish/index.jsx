/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import showValidDishes from "./data";

const createKey = (dish, index) => {
  return `${dish}${index}`;
};

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: ["---"],
      servings: [1],
      showDishError: false
    };

    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.handleAddDish = this.handleAddDish.bind(this);
    this.handleServingChange = this.handleServingChange.bind(this);
  }

  handleDishSelect(event, index) {
    const { dish } = this.state;
    if (dish.includes(event.target.value)) {
      this.setState({ showDishError: "Error: Please select different dish" });
    } else {
      const updatedDish = dish.map((dishName, dex) => {
        return index === dex ? event.target.value : dishName;
      });
      this.setState({ dish: updatedDish, showDishError: false });
    }
  }

  handleAddDish() {
    const { dish } = this.state;
    if (dish.includes("---")) {
      this.setState({ showDishError: "Error: Please select a dish" });
    } else {
      this.setState({ dish: [...dish, "---"] });
    }
  }

  handleServingChange(event, index) {
    const { servings } = this.state;
    const serving = event.target.value;
    const updatedServing = servings.map((serves, dex) => {
      return index === dex ? serving : serves;
    });
    this.setState({ servings: updatedServing });
  }

  render() {
    const { dish, servings, showDishError } = this.state;
    const { restaurant } = this.props;
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
      </div>
    );
  }
}

SelectDish.propTypes = {
  restaurant: PropTypes.string.isRequired
};

export default SelectDish;
