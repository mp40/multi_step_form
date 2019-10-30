import React from "react";
import { shallow } from "enzyme";
import Review from "./index";

describe("reviewing order", () => {
  const wrapper = shallow(
    <Review
      meal="Breakfast"
      people="5"
      restaurant="Breakfast Place 3"
      dish={["Breakfast Dish 3a", "Breakfast Dish 3b"]}
      servings={["3", "3"]}
      handleGoToPrevious={jest.fn()}
      handleSubmit={jest.fn()}
    />
  );
  it("should show the meal type", () => {
    expect(wrapper.text()).toContain("MealBreakfast");
  });
  it("should show number of people", () => {
    expect(wrapper.text()).toContain("No. of people5");
  });
  it("should show the selected restaurant", () => {
    expect(wrapper.text()).toContain("RestaurantBreakfast Place 3");
  });
  it("should show the selected dishes", () => {
    expect(wrapper.text()).toContain(
      "Breakfast Dish 3a - 3Breakfast Dish 3b - 3"
    );
  });
});

describe("buttons", () => {
  const handleGoToPrevious = jest.fn();
  const handleSubmit = jest.fn();
  const wrapper = shallow(
    <Review
      meal="Breakfast"
      people="5"
      restaurant="Breakfast Place 3"
      dish={["Breakfast Dish 3a", "Breakfast Dish 3b"]}
      servings={["3", "3"]}
      handleGoToPrevious={handleGoToPrevious}
      handleSubmit={handleSubmit}
    />
  );
  afterEach(() => {
    handleGoToPrevious.mockClear();
    handleSubmit.mockClear();
  });
  it("should call handleGoToPrevious method when previous button clicked", () => {
    wrapper.find(".prevButton").simulate("click");
    expect(handleGoToPrevious).toHaveBeenCalled();
  });
  it("should call handleSubmit method when submit button clicked", () => {
    wrapper.find(".submit").simulate("click");
    expect(handleSubmit).toHaveBeenCalled();
  });
});
