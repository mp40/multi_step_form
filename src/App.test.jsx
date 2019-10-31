import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import App from "./App";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("submitting data", () => {
  const wrapper = shallow(<App />);
  // eslint-disable-next-line no-console
  const originalLog = console.log;
  global.console = { log: jest.fn() };
  afterEach(() => {
    global.console = { log: originalLog };
  });
  it("should log the data in the console", () => {
    const meal = "Lunch";
    const people = "3";
    const restaurant = "Lunch Place";
    const dish = ["first dish", "second dish"];
    const servings = ["1", "2"];

    wrapper.setState({ meal, people, restaurant, dish, servings });
    wrapper.instance().handleSubmit();
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(
      "Meal: Lunch",
      "No of people: 3",
      "Restaurant: Lunch Place",
      "Dishes: first dish - 1 second dish - 2"
    );
  });
});

describe("using the app", () => {
  const wrapper = mount(<App />);
  it("should start by default on page one", () => {
    expect(wrapper.text()).toContain("Please select a meal");
  });
  it("should be possible to select a meal", () => {
    selectValue(wrapper)(".selectMeal", "Lunch");
    expect(wrapper.find("SelectMeal").props().meal).toBe("Lunch");
  });
  it("should be possible to increment people", () => {
    selectValue(wrapper)("input", "2");
    expect(wrapper.find("InputQty").props().value).toBe("2");
  });
  it("should be possible to go to next page", () => {
    wrapper.find("NextButton").simulate("click");
    expect(wrapper.text()).toContain("Please select a restaurant");
  });
});
