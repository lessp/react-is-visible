"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("intersection-observer");

var _ = require("../");

afterEach(_reactTestingLibrary.cleanup);

var FunctionalComponent = function FunctionalComponent(props) {
  var nodeRef = (0, _react.useRef)();
  var isVisible = (0, _.useIsVisible)(nodeRef);
  return _react.default.createElement("h1", (0, _extends2.default)({
    ref: nodeRef,
    "data-testid": "isVisible-".concat(isVisible)
  }, props));
};

describe('useIsVisible', function () {
  it('renders', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponent, null, "Functional")),
        getByText = _render.getByText,
        rerender = _render.rerender;

    rerender(_react.default.createElement(FunctionalComponent, null, "Functional"));
    expect(getByText('Functional')).toBeInTheDocument();
  });
  it('passes its state as props to a Functional Component', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponent, null, "Functional")),
        getByTestId = _render2.getByTestId,
        rerender = _render2.rerender;

    rerender(_react.default.createElement(FunctionalComponent, null, "Functional"));
    expect(getByTestId('isVisible-false')).toBeInTheDocument();
  });
});