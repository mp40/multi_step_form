import React from "react";
import { shallow, mount } from "enzyme";
import SelectRestaurant from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting a restaurant", () => {
  let wrapper;
  const handleUpdateStateValue = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <SelectRestaurant
        meal="Breakfast"
        restaurant="Breakfast Place 1"
        handleUpdateStateValue={handleUpdateStateValue}
        handleGoToNext={jest.fn()}
        handleGoToPrevious={jest.fn()}
      />
    );
  });
  afterEach(() => {
    handleUpdateStateValue.mockClear();
  });
  it("should have a default of three dashes ", () => {
    const defaultText = wrapper
      .find(".selectRestaurant")
      .childAt(0)
      .text();
    expect(defaultText).toBe("---");
  });
  it("should list breakfast restaurants if breakfast is the selected meal", () => {
    expect(wrapper.find(".selectRestaurant").text()).toContain(
      "Breakfast Place 1Breakfast Place 2Breakfast Place 3"
    );
  });
  it("should list lunch restaurants if lunch is the selected meal", () => {
    wrapper.setProps({ meal: "Lunch" });
    expect(wrapper.find(".selectRestaurant").text()).toContain(
      "Lunch Place 1Lunch Place 2Lunch Place 3"
    );
  });
  it("should list dinner restaurants if dinner is the selected meal", () => {
    wrapper.setProps({ meal: "Dinner" });
    expect(wrapper.find(".selectRestaurant").text()).toContain(
      "Dinner Place 1Dinner Place 2Dinner Place 3"
    );
  });
  it("should be possible to select restaurant", () => {
    wrapper.setProps({ meal: "Dinner" });
    selectValue(wrapper)(".selectRestaurant", "Dinner Place 2");
    expect(handleUpdateStateValue).toHaveBeenCalledWith(
      "restaurant",
      "Dinner Place 2"
    );
  });
});

describe("going to next page", () => {
  const handleGoToNext = jest.fn();
  const nextButton = wrapper => {
    return wrapper
      .find("ButtonBar")
      .dive()
      .find("NextButton");
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <SelectRestaurant
        meal="Breakfast"
        restaurant="---"
        handleUpdateStateValue={jest.fn()}
        handleGoToNext={handleGoToNext}
        handleGoToPrevious={jest.fn()}
      />
    );
  });
  afterEach(() => {
    handleGoToNext.mockClear();
  });
  it("should throw an error if valid restaurant not selected", () => {
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Please select valid restaurant");
  });
  it("should handle going to the next page if restaurant is valid", () => {
    wrapper.setProps({ meal: "Lunch", restaurant: "Lunch Place 3" });
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).toHaveBeenCalled();
  });
});

describe("previous button", () => {
  const handleGoToPrevious = jest.fn();
  const wrapper = shallow(
    <SelectRestaurant
      meal="Breakfast"
      restaurant="Breakfast Place 1"
      handleUpdateStateValue={jest.fn()}
      handleGoToNext={jest.fn()}
      handleGoToPrevious={handleGoToPrevious}
    />
  );
  it("should call handleGoToPrevious method", () => {
    wrapper
      .find("ButtonBar")
      .dive()
      .find("PrevButton")
      .simulate("click");
    expect(handleGoToPrevious).toHaveBeenCalled();
  });
});
