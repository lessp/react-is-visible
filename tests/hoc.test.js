import React from "react";
import ReactDOM from "react-dom";

import renderer from "react-test-renderer";

/* Enzyme */
import { shallow, mount, render } from "enzyme";
import "./setup.js";

import { withIsVisible } from "../src/withIsVisible";

let FunctionalComponent = ({ visibilityStatus, ...props }) => <h1 {...props} />;
FunctionalComponent = withIsVisible(FunctionalComponent);

class ClassComponent extends React.Component {
  render() {
    const { visibilityStatus, ...props } = this.props;

    return <h1 {...props} />;
  }
}
ClassComponent = withIsVisible(ClassComponent);

describe("withIsVisible", () => {
  it("renders a Functional Component", () => {
    const component = mount(
      <FunctionalComponent>Functional</FunctionalComponent>
    );

    expect(component.find("h1").exists()).toBe(true);

    component.unmount();
  });

  it("renders a Class Component", () => {
    const component = mount(<ClassComponent>Class</ClassComponent>);

    expect(component.find("h1").exists()).toBe(true);

    component.unmount();
  });

  it("passes its state as props to a Functional Component", () => {
    const component = mount(<FunctionalComponent />);

    expect(
      component.find("FunctionalComponent").prop("visibilityStatus")
    ).toHaveProperty(
      "isVisible",
      expect.anything(),
      "details",
      expect.anything()
    );

    component.unmount();
  });

  it("passes its state as props to a Class Component", () => {
    const component = mount(<ClassComponent />);

    expect(
      component.find("ClassComponent").prop("visibilityStatus")
    ).toHaveProperty(
      "isVisible",
      expect.anything(),
      "details",
      expect.anything()
    );

    component.unmount();
  });
});
