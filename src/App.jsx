import React, { Component } from "react";
import SelectMeal from "./SelectMeal/index";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "one",
      meal: undefined,
      people: undefined
    };

    this.handleUpdateMealAndPeople = this.handleUpdateMealAndPeople.bind(this);
  }

  handleUpdateMealAndPeople(data) {
    this.setState({
      page: "two",
      meal: data.meal,
      people: data.people
    });
  }

  render() {
    const { page } = this.state;

    return (
      <div className="App">
        <header className="App-header">Multi Step Form</header>
        <div className="App-body">
          {page === "one" && (
            <SelectMeal
              handleUpdateMealAndPeople={this.handleUpdateMealAndPeople}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
