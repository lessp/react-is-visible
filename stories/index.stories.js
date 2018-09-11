import React from "react";

import { storiesOf } from "@storybook/react";

import IsVisible, { withIsVisible } from "../src";

const basicStyling = (addStyling = {}) => ({
  font: "500 16px/1.5 sans-serif",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  ...addStyling
});

const boxStyling = isVisible => ({
  boxSizing: "border-box",
  margin: 0,
  padding: "25px",
  height: "256px",
  width: "256px",
  margin: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 1s ease",
  backgroundColor: isVisible ? "magenta" : "transparent"
});

/* Functional Component */
const FunctionalComponent = ({ isVisible, children, ...props }) => (
  <h1 style={boxStyling(isVisible)} {...props}>
    {children}
  </h1>
);

/* with withIsVisible */
const FunctionalComponentWithIsVisible = withIsVisible(FunctionalComponent);

/* Infinite Scroll */
class InfiniteScroll extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [0, 1, 2, 3, 4],
      counter: 5
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(num) {
    const { counter } = this.state;

    let newItems = [];
    for (let i = counter; i < counter + num; i++) {
      newItems = [...newItems, i];
    }

    this.setState({
      images: [...this.state.images, ...newItems],
      counter: counter + num
    });
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <ul style={basicStyling()}>
          {images.map(image => (
            <IsVisible>
              {isVisible => (
                <li key={image}>
                  <FunctionalComponent key={image} isVisible={isVisible}>
                    {image}
                  </FunctionalComponent>
                </li>
              )}
            </IsVisible>
          ))}
        </ul>
        <IsVisible>
          {isVisible => (
            <div style={{ width: "100%", height: 25 }}>
              {isVisible && this.loadMore(5)}
            </div>
          )}
        </IsVisible>
      </div>
    );
  }
}

storiesOf("React Is Visible", module)
  .add("as HOC", () => (
    <div style={basicStyling({ height: "200vh" })}>
      <h2 style={{ color: "black", marginBottom: "auto" }}>Scroll down</h2>
      <FunctionalComponentWithIsVisible>
        I'm visible!
      </FunctionalComponentWithIsVisible>
    </div>
  ))
  .add("as Render Prop", () => (
    <div style={basicStyling({ height: "200vh" })}>
      <h2 style={{ color: "black", marginBottom: "auto" }}>Scroll down</h2>
      <IsVisible>
        {isVisible => (
          <FunctionalComponent isVisible={isVisible}>
            I'm visible!
          </FunctionalComponent>
        )}
      </IsVisible>
    </div>
  ))
  .add("Infinite Scroll", () => <InfiniteScroll />);
