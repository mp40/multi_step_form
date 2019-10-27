import React from "react";
import { shallow } from "enzyme";
import SelectRestaurant from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting a restaurant", () => {
  const wrapper = shallow(
    <SelectRestaurant
      meal="Breakfast"
      handleUpdateRestaurant={jest.fn()}
      handleGoToPrevious={jest.fn()}
    />
  );
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
  it("should update value when restaurant is selected", () => {
    wrapper.setProps({ meal: "Breakfast" });
    selectValue(wrapper)(".selectRestaurant", "Breakfast Place 2");
    expect(wrapper.find("select").props().value).toBe("Breakfast Place 2");
  });
});

describe("submitting data", () => {
  const handleUpdateRestaurant = jest.fn();
  const wrapper = shallow(
    <SelectRestaurant
      meal="Breakfast"
      handleUpdateRestaurant={handleUpdateRestaurant}
      handleGoToPrevious={jest.fn()}
    />
  );
  it("should submit restaurant", () => {
    wrapper.setState({ restaurant: "Breakfast Place 1" });
    wrapper.find(".nextButton").simulate("click");
    expect(handleUpdateRestaurant).toHaveBeenCalledWith({
      restaurant: "Breakfast Place 1"
    });
    handleUpdateRestaurant.mockClear();
  });
  it("should show error if restaurant not selected", () => {
    wrapper.setState({ restaurant: "---" });
    wrapper.find(".nextButton").simulate("click");
    expect(handleUpdateRestaurant).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Please select valid restaurant");
  });
});

describe("previous button", () => {
  const handleGoToPrevious = jest.fn();
  const wrapper = shallow(
    <SelectRestaurant
      meal="Breakfast"
      handleUpdateRestaurant={jest.fn()}
      handleGoToPrevious={handleGoToPrevious}
    />
  );
  it("should ", () => {
    wrapper.find(".prevButton").simulate("click");
    expect(handleGoToPrevious).toHaveBeenCalled();
  });
});
