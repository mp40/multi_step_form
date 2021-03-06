import React from "react";
import { shallow, mount } from "enzyme";
import SelectDish from "./index";

const selectValue = wrapper => (className, value) =>
  wrapper.find(className).simulate("change", { target: { value } });

describe("selecting dishes", () => {
  let wrapper;
  const handleUpdateStateValue = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <SelectDish
        restaurant="Breakfast Place 3"
        people="1"
        dish={["---"]}
        servings={["1"]}
        handleGoToNext={jest.fn()}
        handleGoToPrevious={jest.fn()}
        handleUpdateStateValue={handleUpdateStateValue}
      />
    );
  });
  afterEach(() => {
    handleUpdateStateValue.mockClear();
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
    expect(handleUpdateStateValue).toHaveBeenCalledWith("dish", [
      "Breakfast Dish 3a"
    ]);
  });
  it("should be possible to select additional dishes", () => {
    const dish = ["Breakfast Dish 3a"];
    wrapper.setProps({ dish });
    wrapper.find(".addDish").simulate("click");
    expect(handleUpdateStateValue).toHaveBeenCalledWith("dish", [
      "Breakfast Dish 3a",
      "---"
    ]);
  });
  it("should remove selected dishes from dish choices", () => {
    const dish = ["Breakfast Dish 3a", "---"];
    wrapper.setProps({ dish });
    expect(
      wrapper
        .find(".selectDish")
        .at(1)
        .text()
    ).not.toContain("Breakfast Dish 3a");
  });
  it("should not allow an extra dish to be added until dish added in existing", () => {
    wrapper.find(".addDish").simulate("click");
    expect(wrapper.find("select")).toHaveLength(1);
    expect(wrapper.text()).toContain("Error: Please select a dish");
  });
  it("should remove error msg when dish selected", () => {
    const showDishError = "Error: Please select a dish";
    wrapper.setState({ showDishError });
    selectValue(wrapper)(".selectDish", "Breakfast Dish 3a");
    expect(wrapper.text()).not.toContain("Error: Please select a dish");
  });
  // it("should not allow the same dish to be added twice", () => {
  //   const dish = ["Breakfast Dish 3a", "---"];
  //   wrapper.setProps({ dish });
  //   wrapper
  //     .find("select")
  //     .at(1)
  //     .simulate("change", { target: { value: "Breakfast Dish 3a" } });
  //   expect(wrapper.text()).toContain("Error: Please select different dish");
  // });
  it("should remove the increment button once all dish options have been used", () => {
    const dish = [
      "Breakfast Dish 3a",
      "Breakfast Dish 3b",
      "Breakfast Dish 3c"
    ];
    const servings = ["1", "1", "1"];
    wrapper.setProps({ dish, servings });
    expect(wrapper.text()).not.toContain("+");
  });
});

describe("incrementing servings", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <SelectDish
        restaurant="Breakfast Place 3"
        people="1"
        dish={["---"]}
        servings={["1"]}
        handleGoToNext={jest.fn()}
        handleGoToPrevious={jest.fn()}
        handleUpdateStateValue={jest.fn()}
      />
    );
  });
  it("should be start with default of one serving", () => {
    expect(wrapper.find("InputQty").props().value).toBe("1");
  });
  it("should increment the correct dish", () => {
    const handleServingChangeSpy = jest.spyOn(
      wrapper.instance(),
      "handleServingChange"
    );
    const dish = ["Breakfast Dish 3a", "Breakfast Dish 3b"];
    const servings = ["1", "1"];
    wrapper.setProps({ dish, servings });
    wrapper
      .find(".servingQty")
      .at(1)
      .simulate("change", { target: { value: "2" } });
    expect(handleServingChangeSpy).toHaveBeenCalledWith(1, "2");
    handleServingChangeSpy.mockClear();
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
      <SelectDish
        restaurant="Breakfast Place 3"
        people="1"
        dish={["---"]}
        servings={["1"]}
        handleGoToNext={handleGoToNext}
        handleGoToPrevious={jest.fn()}
        handleUpdateStateValue={jest.fn()}
      />
    );
  });
  afterEach(() => {
    handleGoToNext.mockClear();
  });
  it("should not proceed to next if valid meals are not selected", () => {
    const dish = ["Breakfast Dish 3a", "---"];
    const servings = ["1", "1"];
    wrapper.setProps({ dish, servings });
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Error: Please select a dish");
  });
  it("should not have more than ten total dishes", () => {
    const dish = ["Breakfast Dish 3a", "Breakfast Dish 3b"];
    const servings = ["5", "6"];
    wrapper.setProps({ dish, servings });
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Too many servings, maximum is ten");
  });
  it("should not have less total dishes than people", () => {
    const people = "5";
    const dish = ["Breakfast Dish 3a", "Breakfast Dish 3b"];
    const servings = ["2", "2"];
    wrapper.setProps({ people, dish, servings });
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain(
      "Not enough servings, minimum is one per person"
    );
  });
  it("should proceed to next page if meals are valid, less than 10 and not less than people", () => {
    const people = "5";
    const dish = ["Breakfast Dish 3a", "Breakfast Dish 3b"];
    const servings = ["3", "2"];
    wrapper.setProps({ people, dish, servings });
    nextButton(wrapper).simulate("click");
    expect(handleGoToNext).toHaveBeenCalled();
  });
});

describe("previous button", () => {
  const handleGoToPrevious = jest.fn();
  const wrapper = shallow(
    <SelectDish
      restaurant="Breakfast Place 3"
      people="1"
      dish={["---"]}
      servings={["1"]}
      handleGoToNext={jest.fn()}
      handleGoToPrevious={handleGoToPrevious}
      handleUpdateStateValue={jest.fn()}
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
