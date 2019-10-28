import React from "react";
import { shallow } from "enzyme";
import SelectDish from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting dishes", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <SelectDish
        restaurant="Breakfast Place 3"
        handleGoToPrevious={jest.fn()}
      />
    );
  });
  it("should have a default of three dashes ", () => {
    const defaultText = wrapper
      .find(".selectDish")
      .childAt(0)
      .text();
    expect(defaultText).toBe("---");
  });
  it("should list the correct dishes for the selected restaurnt", () => {
    expect(wrapper.find(".selectDish").text()).toContain(
      "Breakfast Dish 3aBreakfast Dish 3bBreakfast Dish 3c"
    );
  });
  it("should be possible to select a dish", () => {
    selectValue(wrapper)(".selectDish", "Breakfast Dish 3a");
    expect(wrapper.find("select").props().value).toBe("Breakfast Dish 3a");
  });
  it("should be possible to select additional dishes", () => {
    const dish = ["Breakfast Dish 3a"];
    wrapper.setState({ dish });
    wrapper.find(".addDish").simulate("click");
    expect(wrapper.find("select")).toHaveLength(2);
  });
  it("should not allow an extra dish to be added until dish added in existing", () => {
    wrapper.find(".addDish").simulate("click");
    expect(wrapper.find("select")).toHaveLength(1);
    expect(wrapper.text()).toContain("Error: Please select a dish");
  });
  it("should remove error msg when dish selected", () => {
    const showDishError = "Please select a dish";
    wrapper.setState({ showDishError });
    selectValue(wrapper)(".selectDish", "Breakfast Dish 3a");
    expect(wrapper.text()).not.toContain("Error: Please select a dish");
  });
  it("should not allow the same dish to be added twice", () => {
    const dish = ["Breakfast Dish 3a", "---"];
    wrapper.setState({ dish });
    wrapper
      .find("select")
      .at(1)
      .simulate("change", { target: { value: "Breakfast Dish 3a" } });
    expect(wrapper.text()).toContain("Error: Please select different dish");
  });
});

describe("incrementing servings", () => {
  const wrapper = shallow(
    <SelectDish restaurant="Breakfast Place 3" handleGoToPrevious={jest.fn()} />
  );
  it("should be start with default of one serving", () => {
    expect(wrapper.find(".servingQty").props().value).toBe(1);
  });
  it("should have a minimum value of one", () => {
    expect(wrapper.find(".servingQty").props().min).toBe("1");
  });
  it("should start with a maximum value of ten", () => {
    expect(wrapper.find(".servingQty").props().max).toBe("10");
  });
  it("should increment the correct dish", () => {
    const handleServingChangeSpy = jest.spyOn(
      wrapper.instance(),
      "handleServingChange"
    );
    const dish = ["Breakfast Dish 3a", "Breakfast Dish 3b"];
    const servings = [1, 1];
    wrapper.setState({ dish, servings });
    wrapper
      .find(".servingQty")
      .at(1)
      .simulate("change", { target: { value: 2 } });
    expect(handleServingChangeSpy).toHaveBeenCalledWith(
      { target: { value: 2 } },
      1
    );
    handleServingChangeSpy.mockClear();
  });
});
