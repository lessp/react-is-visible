"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _VisibilityObserver = _interopRequireDefault(require("./VisibilityObserver"));

var IsVisible =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(IsVisible, _React$PureComponent);

  function IsVisible() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, IsVisible);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(IsVisible)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleVisibilityChange", function (_ref) {
      var isIntersecting = _ref.isIntersecting;

      if (_this.state.isVisible !== isIntersecting) {
        _this.setState({
          isVisible: isIntersecting
        });
      }

      if (isIntersecting && _this.props.once) {
        _this.unwatch();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(IsVisible, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unwatch = _VisibilityObserver.default.watch(_reactDom.default.findDOMNode(this), this.handleVisibilityChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unwatch();
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.state.isVisible;
      var renderedChildren = this.props.children(isVisible);
      return renderedChildren && _react.default.Children.only(renderedChildren);
    }
  }]);
  return IsVisible;
}(_react.default.PureComponent);

var _default = IsVisible;
exports.default = _default;