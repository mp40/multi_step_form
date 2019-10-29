/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { validMeals, dataIsValid } from "./data";

class SelectMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };

    this.handleNextIsValid = this.handleNextIsValid.bind(this);
  }

  handleNextIsValid() {
    const { meal, handleGoToNext } = this.props;
    if (dataIsValid(meal)) {
      handleGoToNext();
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { showError } = this.state;
    const { meal, people, handleUpdateStateValue } = this.props;
    return (
      <div>
        <form>
          <label>
            Please select a meal
            <select
              className="selectMeal"
              value={meal}
              onChange={event =>
                handleUpdateStateValue("meal", event.target.value)
              }
            >
              {["---", ...validMeals].map(mealType => {
                return <option key={mealType}>{mealType}</option>;
              })}
            </select>
          </label>
        </form>
        <div>
          Please select number of people
          <input
            type="number"
            name="quantity"
            min="1"
            max="10"
            value={people}
            onChange={event =>
              handleUpdateStateValue("people", event.target.value)
            }
          />
        </div>
        <div>
          <button
            className="nextButton"
            type="submit"
            onClick={() => this.handleNextIsValid()}
          >
            Next
          </button>
        </div>
        {showError && <p>Please select valid meal</p>}
      </div>
    );
  }
}

SelectMeal.propTypes = {
  meal: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  handleUpdateStateValue: PropTypes.func.isRequired,
  handleGoToNext: PropTypes.func.isRequired
};

export default SelectMeal;
