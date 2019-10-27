import React from "react";
import { shallow } from "enzyme";
import SelectMeal from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting a meal", () => {
  const wrapper = shallow(
    <SelectMeal meal="---" people="1" handleUpdateMealAndPeople={jest.fn()} />
  );
  describe("meal options", () => {
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
  });
  describe("selecting a meal", () => {
    it("should be possible to select Breakfast", () => {
      selectValue(wrapper)(".selectMeal", "Breakfast");
      expect(wrapper.find("select").props().value).toBe("Breakfast");
    });
    it("should be possible to select Lunch", () => {
      selectValue(wrapper)(".selectMeal", "Lunch");
      expect(wrapper.find("select").props().value).toBe("Lunch");
    });
    it("should be possible to select Dinner", () => {
      selectValue(wrapper)(".selectMeal", "Dinner");
      expect(wrapper.find("select").props().value).toBe("Dinner");
    });
  });
});

describe("selecting number of people", () => {
  const wrapper = shallow(
    <SelectMeal meal="---" people="1" handleUpdateMealAndPeople={jest.fn()} />
  );
  it("should start with a default of one", () => {
    expect(wrapper.find("input").props().value).toBe("1");
  });
  it("should have a minimum value of one", () => {
    expect(wrapper.find("input").props().min).toBe("1");
  });
  it("should have a maximum value of ten", () => {
    expect(wrapper.find("input").props().max).toBe("10");
  });
});

describe("submitting data", () => {
  const handleUpdateMealAndPeople = jest.fn();
  const wrapper = shallow(
    <SelectMeal
      meal="---"
      people="1"
      handleUpdateMealAndPeople={handleUpdateMealAndPeople}
    />
  );
  it("should submit meal and people", () => {
    wrapper.setState({ meal: "Breakfast", people: "2" });
    wrapper.find(".nextButton").simulate("click");
    expect(handleUpdateMealAndPeople).toHaveBeenCalledWith({
      meal: "Breakfast",
      people: "2"
    });
    handleUpdateMealAndPeople.mockClear();
  });
  it("should show error if meal not selected", () => {
    wrapper.setState({ meal: "---", people: 1 });
    wrapper.find(".nextButton").simulate("click");
    expect(handleUpdateMealAndPeople).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Please select valid meal");
  });
});

describe("setting state on mounting", () => {
  it("should update meal and people when component mounts", () => {
    const setStateSpy = jest.spyOn(SelectMeal.prototype, "setState");
    const wrapper = shallow(
      <SelectMeal
        meal="Breakfast"
        people="10"
        handleUpdateMealAndPeople={jest.fn()}
      />
    );
    expect(setStateSpy).toHaveBeenCalledWith({
      meal: "Breakfast",
      people: "10"
    });
    setStateSpy.mockClear();
  });
});
