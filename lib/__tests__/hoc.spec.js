"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("intersection-observer");

var _ = require("../");

afterEach(_reactTestingLibrary.cleanup);

var FunctionalComponent = function FunctionalComponent(_ref) {
  var isVisible = _ref.isVisible,
      props = (0, _objectWithoutProperties2.default)(_ref, ["isVisible"]);
  return _react.default.createElement("h1", (0, _extends2.default)({
    "data-testid": "isVisible-".concat(isVisible)
  }, props));
};

FunctionalComponent = (0, _.withIsVisible)(FunctionalComponent);

var ClassComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ClassComponent, _React$Component);

  function ClassComponent() {
    (0, _classCallCheck2.default)(this, ClassComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ClassComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(ClassComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isVisible = _this$props.isVisible,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["isVisible"]);
      return _react.default.createElement("h1", (0, _extends2.default)({
        "data-testid": "isVisible-".concat(isVisible)
      }, props));
    }
  }]);
  return ClassComponent;
}(_react.default.Component);

ClassComponent = (0, _.withIsVisible)(ClassComponent);
describe('withIsVisible', function () {
  it('renders a Functional Component', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponent, null, "Functional")),
        getByText = _render.getByText;

    expect(getByText('Functional')).toBeInTheDocument();
  });
  it('renders a Class Component', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(ClassComponent, null, "Class")),
        getByText = _render2.getByText;

    expect(getByText('Class')).toBeInTheDocument();
  });
  it('passes its state as props to a Functional Component', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponent, null)),
        getByTestId = _render3.getByTestId;

    expect(getByTestId('isVisible-false')).toBeInTheDocument();
  });
  it('passes its state as props to a Class Component', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(ClassComponent, null)),
        getByTestId = _render4.getByTestId;

    expect(getByTestId('isVisible-false')).toBeInTheDocument();
  });
});