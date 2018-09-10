import React from "react";

import { storiesOf } from "@storybook/react";

import IsVisible, { withIsVisible } from "../src";

const basicStyling = {
  height: "300vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "sans-serif"
};

/* Functional Component */
const FunctionalComponent = ({ isVisible }) => (
  <h1>{isVisible && `I'm visible!`}</h1>
);

/* with withIsVisible */
const FunctionalComponentWithIsVisible = withIsVisible(FunctionalComponent);

storiesOf("React Is Visible", module)
  .add("as HOC", () => (
    <div style={basicStyling}>
      <FunctionalComponentWithIsVisible />
    </div>
  ))
  .add("as Render Prop", () => (
    <div style={basicStyling}>
      <IsVisible>
        {isVisible => <FunctionalComponent isVisible={isVisible} />}
      </IsVisible>
    </div>
  ));
