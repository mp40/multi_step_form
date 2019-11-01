import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import App from "./App";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

const findSpanWithActiveClassName = wrapper => index =>
  wrapper
    .find(".progressBar")
    .childAt(index)
    .find(".active");

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("the progress bar", () => {
  const wrapper = shallow(<App />);
  it("should apply the active class name to first span when page is one", () => {
    expect(findSpanWithActiveClassName(wrapper)(0).exists()).toBe(true);
    expect(findSpanWithActiveClassName(wrapper)(1).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(2).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(3).exists()).toBe(false);
  });
  it("should apply the active class name to second span when page is two", () => {
    const page = 2;
    wrapper.setState({ page });
    expect(findSpanWithActiveClassName(wrapper)(0).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(1).exists()).toBe(true);
    expect(findSpanWithActiveClassName(wrapper)(2).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(3).exists()).toBe(false);
  });
  it("should apply the active class name to third span when page is three", () => {
    const page = 3;
    wrapper.setState({ page });
    expect(findSpanWithActiveClassName(wrapper)(0).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(1).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(2).exists()).toBe(true);
    expect(findSpanWithActiveClassName(wrapper)(3).exists()).toBe(false);
  });
  it("should apply the active class name to fourth span when page is four", () => {
    const page = 4;
    wrapper.setState({ page });
    expect(findSpanWithActiveClassName(wrapper)(0).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(1).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(2).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(3).exists()).toBe(true);
  });
  it("should not apply the active class name when page is five", () => {
    const page = 5;
    wrapper.setState({ page });
    expect(findSpanWithActiveClassName(wrapper)(0).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(1).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(2).exists()).toBe(false);
    expect(findSpanWithActiveClassName(wrapper)(3).exists()).toBe(false);
  });
});

describe("submitting data", () => {
  const wrapper = shallow(<App />);
  // eslint-disable-next-line no-console
  const originalLog = console.log;
  // eslint-disable-next-line no-console
  console.log = jest.fn();
  afterAll(() => {
    // eslint-disable-next-line no-console
    console.log = originalLog;
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
  describe("using page one", () => {
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
    it("should be possible to go back to page one without losing choices", () => {
      wrapper.find("PrevButton").simulate("click");
      expect(wrapper.text()).toContain("Please select a meal");
      expect(wrapper.find("SelectMeal").props().meal).toBe("Lunch");
      expect(wrapper.find("InputQty").props().value).toBe("2");
    });
  });
  describe("using page two", () => {
    const wrapper = mount(<App />);
    const page = 2;
    const meal = "Lunch";
    const people = "2";
    wrapper.setState({ page, meal, people });
    it("should be possible to select a restaurant", () => {
      selectValue(wrapper)(".selectRestaurant", "Lunch Place 2");
      expect(wrapper.find("SelectRestaurant").props().restaurant).toBe(
        "Lunch Place 2"
      );
    });
    it("should be possible to go to next page", () => {
      wrapper.find("NextButton").simulate("click");
      expect(wrapper.text()).toContain("Please select a dish");
    });
    it("should be possible to go back to page two without losing choices", () => {
      wrapper.find("PrevButton").simulate("click");
      expect(wrapper.text()).toContain("Please select a restaurant");
      expect(wrapper.find("SelectRestaurant").props().restaurant).toBe(
        "Lunch Place 2"
      );
    });
  });
  describe("using page three", () => {
    const wrapper = mount(<App />);
    const page = 3;
    const meal = "Lunch";
    const people = "2";
    const restaurant = "Lunch Place 2";
    wrapper.setState({ page, meal, people, restaurant });
    it("should be possible to select dish", () => {
      selectValue(wrapper)(".selectDish", "Breakfast Dish 3a");
      expect(wrapper.find("SelectDish").props().dish).toEqual([
        "Breakfast Dish 3a"
      ]);
    });
    it("should be possible to increment dish", () => {
      wrapper
        .find(".servingQty")
        .simulate("change", { target: { value: "2" } });
      expect(wrapper.find("SelectDish").props().servings).toEqual(["2"]);
    });
    it("should be possible to go to next page", () => {
      wrapper.find("NextButton").simulate("click");
      expect(wrapper.text()).toContain(
        "MealLunchNo. of people2RestaurantLunch Place 2DishesBreakfast Dish 3a - 2"
      );
    });
    it("should be possible to go back to page three without losing choices", () => {
      wrapper.find("PrevButton").simulate("click");
      expect(wrapper.text()).toContain("Please select a dish");
      expect(wrapper.find("SelectDish").props().dish).toEqual([
        "Breakfast Dish 3a"
      ]);
      expect(wrapper.find("SelectDish").props().servings).toEqual(["2"]);
    });
  });
  describe("using review page", () => {
    const wrapper = mount(<App />);
    const page = 4;
    const meal = "Lunch";
    const people = "2";
    const restaurant = "Lunch Place 2";
    const dish = ["Breakfast Dish 3a"];
    const servings = ["2"];
    wrapper.setState({ page, meal, people, restaurant, dish, servings });
    it("should show review of choices", () => {
      expect(wrapper.text()).toContain(
        "MealLunchNo. of people2RestaurantLunch Place 2DishesBreakfast Dish 3a - 2"
      );
    });
    it("should be possible to go back to page three without losing choices", () => {
      wrapper.find("PrevButton").simulate("click");
      expect(wrapper.text()).toContain("Please select a dish");
      expect(wrapper.find("SelectDish").props().dish).toEqual([
        "Breakfast Dish 3a"
      ]);
      expect(wrapper.find("SelectDish").props().servings).toEqual(["2"]);
    });
    it("should be possible to submit data", () => {
      wrapper.setState({ page });
      wrapper.find("SubmitButton").simulate("click");
      expect(wrapper.text()).toContain("Thank you");
    });
  });
});
