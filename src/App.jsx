import React, { Component } from "react";
import SelectMeal from "./SelectMeal/index";
import SelectRestaurant from "./SelectRestaurant/index";
import SelectDish from "./SelectDish/index";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      meal: "---",
      people: "1",
      restaurant: "---"
    };

    this.handleUpdateMealAndPeople = this.handleUpdateMealAndPeople.bind(this);
    this.handleUpdateRestaurant = this.handleUpdateRestaurant.bind(this);
    this.handleGoToPrevious = this.handleGoToPrevious.bind(this);
  }

  handleUpdateMealAndPeople(data) {
    const { page } = this.state;
    this.setState({
      page: page + 1,
      meal: data.meal,
      people: data.people
    });
  }

  handleUpdateRestaurant(restaurant) {
    const { page } = this.state;
    this.setState({
      page: page + 1,
      restaurant
    });
  }

  handleGoToPrevious() {
    const { page } = this.state;
    this.setState({
      page: page - 1
    });
  }

  render() {
    const { page, meal, people, restaurant } = this.state;
    return (
      <div className="App">
        <header className="App-header">Multi Step Form</header>
        <div className="App-body">
          {page === 1 && (
            <SelectMeal
              meal={meal}
              people={people}
              handleUpdateMealAndPeople={this.handleUpdateMealAndPeople}
            />
          )}
          {page === 2 && (
            <SelectRestaurant
              meal={meal}
              handleUpdateRestaurant={this.handleUpdateRestaurant}
              handleGoToPrevious={this.handleGoToPrevious}
            />
          )}
          {page === 3 && <SelectDish restaurant={restaurant} />}
        </div>
      </div>
    );
  }
}

export default App;
