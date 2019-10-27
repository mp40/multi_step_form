/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import showValidDishes from "./data";

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: ["---"]
    };

    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.handleAddDish = this.handleAddDish.bind(this);
  }

  handleDishSelect(event, index) {
    const { dish } = this.state;
    const updatedDish = dish.map((dishName, dex) => {
      return index === dex ? event.target.value : dishName;
    });
    this.setState({ dish: updatedDish });
  }

  handleAddDish() {
    const { dish } = this.state;
    this.setState({ dish: [...dish, "---"] });
  }

  render() {
    const { dish } = this.state;
    const { restaurant } = this.props;
    return (
      <div>
        <form>
          <label>
            Please select a dish
            {dish.map((dishType, index) => {
              return (
                <select
                  key={dishType}
                  className="selectDish"
                  value={dishType}
                  onChange={event => this.handleDishSelect(event, index)}
                >
                  {["---", ...showValidDishes(restaurant, dish)].map(dishes => {
                    return <option key={dishes}>{dishes}</option>;
                  })}
                </select>
              );
            })}
            <div>
              <button
                className="addDish"
                type="button"
                onClick={() => this.handleAddDish()}
              >
                +
              </button>
            </div>
          </label>
        </form>
      </div>
    );
  }
}

SelectDish.propTypes = {
  restaurant: PropTypes.string.isRequired
};

export default SelectDish;
