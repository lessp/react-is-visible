import React from "react";

/* Enzyme */
import { mount } from "enzyme";
import "./setup.js";

import "intersection-observer";
import { withIsVisible, VisibilityObserver as VO } from "../src";

let FunctionalComponent = ({ isVisible, ...props }) => <h1 {...props} />;
FunctionalComponent = withIsVisible(FunctionalComponent);

class ClassComponent extends React.Component {
  render() {
    const { isVisible, ...props } = this.props;

    return <h1 {...props} />;
  }
}
ClassComponent = withIsVisible(ClassComponent);

describe("VisibilityObserver", () => {
  it("adds a wrapped functional component to subscriber list", () => {
    const component = mount(
      <FunctionalComponent>FunctionalComponent</FunctionalComponent>
    );

    const subscribers = VO.getSubscribers();

    expect(subscribers.has(component.getDOMNode())).toBe(true);

    component.unmount();
  });

  it("removes a wrapped functional component from subscriber list on unmount", () => {
    const component = mount(
      <FunctionalComponent>FunctionalComponent</FunctionalComponent>
    );

    const subscribers = VO.getSubscribers();

    const domNode = component.getDOMNode();

    expect(subscribers.has(domNode)).toBe(true);

    component.unmount();

    expect(subscribers.has(domNode)).toBe(false);
  });

  it("adds a wrapped class component to subscriber list", () => {
    const component = mount(<ClassComponent>ClassComponent</ClassComponent>);

    const subscribers = VO.getSubscribers();

    expect(subscribers.has(component.getDOMNode())).toBe(true);

    component.unmount();
  });

  it("removes a wrapped class component from subscriber list on unmount", () => {
    const component = mount(<ClassComponent>ClassComponent</ClassComponent>);

    const subscribers = VO.getSubscribers();

    const domNode = component.getDOMNode();

    expect(subscribers.has(domNode)).toBe(true);

    component.unmount();

    expect(subscribers.has(domNode)).toBe(false);
  });
});
