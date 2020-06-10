"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("intersection-observer");

var _ = require("../");

afterEach(_reactTestingLibrary.cleanup);

var FunctionalComponent = function FunctionalComponent(_ref) {
  var isVisible = _ref.isVisible,
      props = (0, _objectWithoutProperties2.default)(_ref, ["isVisible"]);
  return _react.default.createElement("h1", props);
};

var FunctionalComponentWithIsVisible = (0, _.withIsVisible)(FunctionalComponent);

var FunctionalComponentHook = function FunctionalComponentHook(props) {
  var nodeRef = (0, _react.useRef)();
  var isVisible = (0, _.useIsVisible)(nodeRef);
  return _react.default.createElement("h1", (0, _extends2.default)({
    ref: nodeRef,
    "data-testid": "isVisible-".concat(isVisible)
  }, props));
};

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
      return _react.default.createElement("h1", props);
    }
  }]);
  return ClassComponent;
}(_react.default.Component);

var ClassComponentWithIsVisible = (0, _.withIsVisible)(ClassComponent);
describe('VisibilityObserver', function () {
  it('adds a wrapped functional component to subscriber list', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponentWithIsVisible, null, "FunctionalComponentWithIsVisible")),
        getByText = _render.getByText;

    var subscribers = _.VisibilityObserver.getSubscribers();

    expect(subscribers.has(getByText('FunctionalComponentWithIsVisible'))).toBe(true);
  });
  it('removes a wrapped functional component from subscriber list on unmount', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponentWithIsVisible, null, "FunctionalComponentWithIsVisible")),
        getByText = _render2.getByText,
        unmount = _render2.unmount;

    var subscribers = _.VisibilityObserver.getSubscribers();

    var domNode = getByText('FunctionalComponentWithIsVisible');
    expect(subscribers.has(domNode)).toBe(true);
    unmount();
    expect(subscribers.has(domNode)).toBe(false);
  });
  it('adds a wrapped class component to subscriber list', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(ClassComponentWithIsVisible, null, "ClassComponentWithIsVisible")),
        getByText = _render3.getByText,
        unmount = _render3.unmount;

    var subscribers = _.VisibilityObserver.getSubscribers();

    expect(subscribers.has(getByText('ClassComponentWithIsVisible'))).toBe(true);
    unmount();
  });
  it('removes a wrapped class component from subscriber list on unmount', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(ClassComponentWithIsVisible, null, "ClassComponentWithIsVisible")),
        getByText = _render4.getByText,
        unmount = _render4.unmount;

    var subscribers = _.VisibilityObserver.getSubscribers();

    var domNode = getByText('ClassComponentWithIsVisible');
    expect(subscribers.has(domNode)).toBe(true);
    unmount();
    expect(subscribers.has(domNode)).toBe(false);
  });
  it('adds a functional component (hook) to subscriber list', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponentHook, null, "FunctionalComponentHook")),
        getByText = _render5.getByText,
        unmount = _render5.unmount,
        rerender = _render5.rerender;

    rerender(_react.default.createElement(FunctionalComponentHook, null, "FunctionalComponentHook"));

    var subscribers = _.VisibilityObserver.getSubscribers();

    expect(subscribers.has(getByText('FunctionalComponentHook'))).toBe(true);
    unmount();
  });
  it('removes a functional component (hook) from subscriber list on unmount', function () {
    var _render6 = (0, _reactTestingLibrary.render)(_react.default.createElement(FunctionalComponentHook, null, "FunctionalComponentHook")),
        getByText = _render6.getByText,
        unmount = _render6.unmount,
        rerender = _render6.rerender;

    rerender(_react.default.createElement(FunctionalComponentHook, null, "FunctionalComponentHook"));

    var subscribers = _.VisibilityObserver.getSubscribers();

    var domNode = getByText('FunctionalComponentHook');
    expect(subscribers.has(domNode)).toBe(true);
    unmount();
    expect(subscribers.has(domNode)).toBe(false);
  });
  it('removes a wrapped class component from subscriber list on unmount', function () {
    var _render7 = (0, _reactTestingLibrary.render)(_react.default.createElement(ClassComponentWithIsVisible, null, "ClassComponentWithIsVisible")),
        getByText = _render7.getByText,
        unmount = _render7.unmount;

    var subscribers = _.VisibilityObserver.getSubscribers();

    var domNode = getByText('ClassComponentWithIsVisible');
    expect(subscribers.has(domNode)).toBe(true);
    unmount();
    expect(subscribers.has(domNode)).toBe(false);
  });
});