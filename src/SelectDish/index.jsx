import React, { Component } from "react";
import PropTypes from "prop-types";
import FormLabel from "../components/FormLabel";
import InputQty from "../components/InputQty";
import AddDishButton from "../components/AddDishButton";
import ButtonBar from "../components/ButtonBar";
import showValidDishes from "./data";

import "./styles.css";

const createKey = (dish, index) => {
  return `${dish}${index}`;
};

export const getTotalServings = servings => {
  return servings.reduce((acc, amount) => {
    return acc + parseInt(amount, 10);
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

  handleDishSelect(index, eventValue) {
    const { dish, handleUpdateStateValue } = this.props;

    // if (dish.includes(eventValue)) {
    //   this.setState({ showDishError: "Error: Please select different dish" });
    // } else {
    const updatedDish = dish.map((dishName, dex) => {
      return index === dex ? eventValue : dishName;
    });
    this.setState({ showDishError: false });
    handleUpdateStateValue("dish", updatedDish);
    // }
  }

  handleAddDish() {
    const { dish, servings, handleUpdateStateValue } = this.props;
    if (dish.includes("---")) {
      this.setState({ showDishError: true });
    } else {
      handleUpdateStateValue("dish", [...dish, "---"]);
      handleUpdateStateValue("servings", [...servings, "1"]);
    }
  }

  handleServingChange(index, eventValue) {
    const { servings, handleUpdateStateValue } = this.props;
    const serving = eventValue;
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
      <div className="selectDishContainer">
        <div className="selectDishHeadings">
          <div> Please select a dish</div>
          <div>Please enter no. of servings</div>
        </div>
        <form>
          {dish.map((dishType, index) => {
            return (
              <div key={createKey(dishType, index)} className="dishSelectRow">
                <FormLabel
                  name="selectDish"
                  value={dishType}
                  handleUpdate={this.handleDishSelect}
                  handleUpdateKey={index}
                  contents={() =>
                    [
                      dishType,
                      ...showValidDishes(restaurant).filter(item => {
                        return !dish.includes(item);
                      })
                    ].map(dishes => {
                      return <option key={dishes}>{dishes}</option>;
                    })
                  }
                />
                <div>
                  <InputQty
                    className="servingQty"
                    value={servings[index] || "1"}
                    handleUpdate={this.handleServingChange}
                    handleUpdateKey={index}
                  />
                </div>
              </div>
            );
          })}
        </form>
        {dish.length < showValidDishes(restaurant).length && (
          <AddDishButton onClick={this.handleAddDish} />
        )}
        {showDishError && (
          <p className="errorMsg">Error: Please select a dish</p>
        )}
        {showServingsError && getTotalServings(servings) > 10 && (
          <p className="errorMsg">Too many servings, maximum is ten</p>
        )}
        {showServingsError && getTotalServings(servings) < people && (
          <p className="errorMsg">
            Not enough servings, minimum is one per person
          </p>
        )}
        <ButtonBar
          onClickLeft={handleGoToPrevious}
          onClickRight={this.handleNextIsValid}
        />
      </div>
    );
  }
}

SelectDish.propTypes = {
  restaurant: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  dish: PropTypes.arrayOf(PropTypes.string).isRequired,
  servings: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired,
  handleGoToPrevious: PropTypes.func.isRequired
};

export default SelectDish;
