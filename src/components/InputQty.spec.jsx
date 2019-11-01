import React from "react";
import { shallow } from "enzyme";
import InputQty from "./InputQty";

describe("InputQty component", () => {
  const wrapper = shallow(
    <InputQty value="" handleUpdate={jest.fn()} handleUpdateKey="" />
  );
  it("should have a minimum value of one", () => {
    expect(wrapper.find("input").props().min).toBe("1");
  });
  it("should start with a maximum value of ten", () => {
    expect(wrapper.find("input").props().max).toBe("10");
  });
});
