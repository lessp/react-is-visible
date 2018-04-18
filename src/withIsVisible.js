import React from "react";
import ReactDOM from "react-dom";

import hoistNonReactStatic from "hoist-non-react-statics";

import VO from "./VisibilityObserver";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

export const withIsVisible = WrappedComponent => {
  class WithIsVisible extends React.Component {
    constructor(props) {
      super(props);

      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

      this.state = {
        visibilityStatus: {
          isVisible: false,
          details: {}
        }
      };
    }

    componentDidMount() {
      this.unwatch = VO.watch(
        ReactDOM.findDOMNode(this),
        this.handleVisibilityChange
      );
    }

    componentWillUnmount() {
      this.unwatch();
    }

    handleVisibilityChange({ isIntersecting, boundingClientRect, time }) {
      this.setState({
        visibilityStatus: {
          isVisible: isIntersecting,
          details: {
            boundingClientRect,
            time
          }
        }
      });
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      return (
        <WrappedComponent
          visibilityStatus={this.state.visibilityStatus}
          ref={forwardedRef}
          {...props}
        />
      );
    }
  }

  /* Display name */
  WithIsVisible.displayName = `WithIsVisible(${getDisplayName(
    WrappedComponent
  )})`;

  /* Passes non-React static methods */
  hoistNonReactStatic(WithIsVisible, WrappedComponent);

  /* Forward refs */
  function forwardRef(props, ref) {
    return <WithIsVisible {...props} forwardedRef={ref} />;
  }

  forwardRef.displayName = `withIsVisible(${getDisplayName(WrappedComponent)})`;

  return React.forwardRef(forwardRef);
};
