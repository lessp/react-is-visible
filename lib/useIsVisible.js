"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _VisibilityObserver = _interopRequireDefault(require("./VisibilityObserver"));

var defaultOptions = {
  once: false
};

function useIsVisible(nodeRef) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      once = _ref.once;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  function handleVisibilityChange(_ref2) {
    var isIntersecting = _ref2.isIntersecting;
    setVisible(isIntersecting);

    if (isIntersecting && once) {
      _VisibilityObserver.default.unwatch(nodeRef.current);
    }
  }

  (0, _react.useEffect)(function () {
    return _VisibilityObserver.default.watch(nodeRef.current, handleVisibilityChange);
  }, [nodeRef, handleVisibilityChange]);
  return isVisible;
}

var _default = useIsVisible;
exports.default = _default;