"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withIsVisible = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _IsVisible = _interopRequireDefault(require("./IsVisible"));

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var defaultOptions = {
  once: false
};

var withIsVisible = function withIsVisible(WrappedComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      once = _ref.once;

  var WithIsVisible = function WithIsVisible(_ref2) {
    var forwardedRef = _ref2.forwardedRef,
        props = (0, _objectWithoutProperties2.default)(_ref2, ["forwardedRef"]);
    return _react.default.createElement(_IsVisible.default, {
      once: once,
      children: function children(isVisible) {
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, props, {
          isVisible: isVisible,
          ref: forwardedRef
        }));
      }
    });
  };
  /* Display name */


  WithIsVisible.displayName = "WithIsVisible(".concat(getDisplayName(WrappedComponent), ")");
  /* Passes non-React static methods */

  (0, _hoistNonReactStatics.default)(WithIsVisible, WrappedComponent);
  /* Forward refs */

  function forwardRef(props, ref) {
    return _react.default.createElement(WithIsVisible, (0, _extends2.default)({}, props, {
      forwardedRef: ref
    }));
  }

  forwardRef.displayName = "withIsVisible(".concat(getDisplayName(WrappedComponent), ")");
  return _react.default.forwardRef(forwardRef);
};

exports.withIsVisible = withIsVisible;