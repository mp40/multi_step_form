import React from "react";
import { shallow, mount } from "enzyme";
import SelectMeal from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting a meal", () => {
  const handleUpdateStateValue = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <SelectMeal
        meal="---"
        people="1"
        handleUpdateStateValue={handleUpdateStateValue}
        handleGoToNext={jest.fn()}
      />
    );
  });
  afterEach(() => {
    handleUpdateStateValue.mockClear();
  });
  it("should have a default of three dashes ", () => {
    const defaultText = wrapper
      .find(".selectMeal")
      .childAt(0)
      .text();
    expect(defaultText).toBe("---");
  });
  it("should have a breakfast option", () => {
    const mealText = wrapper
      .find(".selectMeal")
      .childAt(1)
      .text();
    expect(mealText).toBe("Breakfast");
  });
  it("should have a lunch option", () => {
    const mealText = wrapper
      .find(".selectMeal")
      .childAt(2)
      .text();
    expect(mealText).toBe("Lunch");
  });
  it("should have a dinner option", () => {
    const mealText = wrapper
      .find(".selectMeal")
      .childAt(3)
      .text();
    expect(mealText).toBe("Dinner");
  });
  it("should be possible to select Breakfast", () => {
    selectValue(wrapper)(".selectMeal", "Breakfast");
    expect(handleUpdateStateValue).toHaveBeenCalledWith("meal", "Breakfast");
  });
  it("should be possible to select Lunch", () => {
    selectValue(wrapper)(".selectMeal", "Lunch");
    expect(handleUpdateStateValue).toHaveBeenCalledWith("meal", "Lunch");
  });
  it("should be possible to select Dinner", () => {
    selectValue(wrapper)(".selectMeal", "Dinner");
    expect(handleUpdateStateValue).toHaveBeenCalledWith("meal", "Dinner");
  });
});

describe("selecting number of people", () => {
  const handleUpdateStateValue = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <SelectMeal
        meal="---"
        people="1"
        handleUpdateStateValue={handleUpdateStateValue}
        handleGoToNext={jest.fn()}
      />
    );
  });
  afterEach(() => {
    handleUpdateStateValue.mockClear();
  });
  it("should start with a default of one", () => {
    expect(wrapper.find("input").props().value).toBe("1");
  });
  it("should be possible to increment people", () => {
    selectValue(wrapper)("input", "2");
    expect(handleUpdateStateValue).toHaveBeenCalledWith("people", "2");
  });
});

describe("going to next page", () => {
  const handleGoToNext = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <SelectMeal
        meal="---"
        people="1"
        handleUpdateStateValue={jest.fn()}
        handleGoToNext={handleGoToNext}
      />
    );
  });
  afterEach(() => {
    handleGoToNext.mockClear();
  });
  it("should throw an error if valid meal not selected", () => {
    wrapper.find("NextButton").simulate("click");
    expect(handleGoToNext).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Please select valid meal");
  });
  it("should handle going to the next page if meal is valid", () => {
    wrapper.setProps({ meal: "Lunch" });
    wrapper.find("NextButton").simulate("click");
    expect(handleGoToNext).toHaveBeenCalled();
  });
});
