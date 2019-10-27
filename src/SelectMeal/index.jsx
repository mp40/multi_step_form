/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { validMeals, dataIsValid } from "./data";

class SelectMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: "---",
      people: 1,
      showError: false
    };

    this.handleMealChange = this.handleMealChange.bind(this);
    this.handlePeopleChange = this.handlePeopleChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    const { meal, people } = this.props;
    this.setState({ meal, people });
  }

  handleMealChange(event) {
    const meal = event.target.value;
    this.setState({ meal });
  }

  handlePeopleChange(event) {
    const people = event.target.value;
    this.setState({ people });
  }

  submitData() {
    const { meal, people } = this.state;
    const { handleUpdateMealAndPeople } = this.props;
    if (dataIsValid(meal)) {
      handleUpdateMealAndPeople({ meal, people });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { meal, people, showError } = this.state;
    return (
      <div>
        <form>
          <label>
            Please select a meal
            <select
              className="selectMeal"
              value={meal}
              onChange={this.handleMealChange}
            >
              {["---", ...validMeals].map(mealType => {
                return <option key={mealType}>{mealType}</option>;
              })}
            </select>
          </label>
          {showError && <p>Please select valid meal</p>}
        </form>
        <div>
          Please select number of people
          <input
            type="number"
            name="quantity"
            min="1"
            max="10"
            value={people}
            onChange={this.handlePeopleChange}
          />
        </div>
        <div>
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

SelectMeal.propTypes = {
  meal: PropTypes.string.isRequired,
  people: PropTypes.string.isRequired,
  handleUpdateMealAndPeople: PropTypes.func.isRequired
};

export default SelectMeal;
