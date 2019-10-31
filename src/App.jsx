import React, { Component } from "react";
import SelectMeal from "./SelectMeal/index";
import SelectRestaurant from "./SelectRestaurant/index";
import SelectDish from "./SelectDish/index";
import "./App.css";
import Review from "./Review";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      meal: "---",
      people: "1",
      restaurant: "---",
      dish: ["---"],
      servings: ["1"]
    };

    this.handleUpdateStateValue = this.handleUpdateStateValue.bind(this);
    this.handleGoToNext = this.handleGoToNext.bind(this);
    this.handleGoToPrevious = this.handleGoToPrevious.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdateStateValue(name, value) {
    this.setState({ [name]: value });
  }

  handleGoToNext() {
    const { page } = this.state;
    this.setState({
      page: page + 1
    });
  }

  handleGoToPrevious() {
    const { page } = this.state;
    this.setState({
      page: page - 1
    });
  }

  handleSubmit() {
    const { meal, people, restaurant, dish, servings } = this.state;
    const mealLine = `Meal: ${meal}`;
    const peopleLine = `No of people: ${people}`;
    const restaurantLine = `Restaurant: ${restaurant}`;
    let dishLine = "Dishes:";
    dish.forEach((dishName, index) => {
      dishLine = dishLine.concat(` ${dishName} - ${servings[index]}`);
    });
    // eslint-disable-next-line no-console
    console.log(mealLine, peopleLine, restaurantLine, dishLine);
    this.handleGoToNext();
  }

  render() {
    const { page, meal, people, restaurant, dish, servings } = this.state;
    return (
      <div className="App">
        <header className="App-header">Multi Step Form</header>
        <div className="App-body">
          <div className="contents">
            {page === 1 && (
              <SelectMeal
                meal={meal}
                people={people}
                handleUpdateStateValue={this.handleUpdateStateValue}
                handleGoToNext={this.handleGoToNext}
              />
            )}
            {page === 2 && (
              <SelectRestaurant
                meal={meal}
                restaurant={restaurant}
                handleUpdateStateValue={this.handleUpdateStateValue}
                handleGoToNext={this.handleGoToNext}
                handleGoToPrevious={this.handleGoToPrevious}
              />
            )}
            {page === 3 && (
              <SelectDish
                restaurant={restaurant}
                people={people}
                dish={dish}
                servings={servings}
                handleUpdateStateValue={this.handleUpdateStateValue}
                handleGoToNext={this.handleGoToNext}
                handleGoToPrevious={this.handleGoToPrevious}
              />
            )}
            {page === 4 && (
              <Review
                meal={meal}
                restaurant={restaurant}
                people={people}
                dish={dish}
                servings={servings}
                handleGoToPrevious={this.handleGoToPrevious}
                handleSubmit={this.handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
