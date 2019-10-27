import React from "react";
import { shallow } from "enzyme";
import SelectDish from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting dishes", () => {
  const wrapper = shallow(
    <SelectDish restaurant="Breakfast Place 3" handleGoToPrevious={jest.fn()} />
  );
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
    wrapper.find(".addDish").simulate("click");
    expect(wrapper.find("select")).toHaveLength(2);
  });
  it("should not show previously selected dishes", () => {
    expect(
      wrapper
        .find(".selectDish")
        .at(1)
        .text()
    ).not.toContain("Breakfast Dish 3a");
  });
});
