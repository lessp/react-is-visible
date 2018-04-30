import React from "react";
import ReactDOM from "react-dom";

import renderer from "react-test-renderer";

/* Enzyme */
import { shallow, mount, render } from "enzyme";
import "./setup.js";

import VisibilityObserver from "../src/VisibilityObserver";

let FunctionalComponent = ({ visibilityStatus, ...props }) => <h1 {...props} />;
FunctionalComponent = withIsVisible(FunctionalComponent);

class ClassComponent extends React.Component {
  render() {
    const { visibilityStatus, ...props } = this.props;

    return <h1 {...props} />;
  }
}
ClassComponent = withIsVisible(ClassComponent);

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
