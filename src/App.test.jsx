import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("works with enzyme", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.text()).toContain("Learn React");
});
