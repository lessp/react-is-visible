import React from "react";
import ReactDOM from "react-dom";

import renderer from "react-test-renderer";

import VisibilityObserver from "../src/VisibilityObserver";
import { withIsVisible } from "../src/withIsVisible";

/* Enzyme */
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

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

/**
 * TODO: Add these tests and think about how to make these less tightly coupled
describe("VisibilityObserver", () => {
  it("adds a wrapped component to subscriber list", () => {
    const component = mount(<FunctionalComponent />);

    component.unmount();
  });
  it("removes a wrapped component from subscriber list on unmount", () => {
    const component = mount(<FunctionalComponent />);

    component.unmount();
  });
});
*/
