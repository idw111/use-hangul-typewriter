"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _hangulJs = require("hangul-js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DIRECTION_NONE = 0;
var DIRECTION_RIGHT = 1;
var DIRECTION_LEFT = -1;
var defaultState = {
  text: '',
  index: 0,
  cursor: 0,
  direction: DIRECTION_RIGHT,
  storedDirection: DIRECTION_RIGHT
};
/**
 *
 * @param {Array} texts
 * @param {number} interval
 * @param {number} waitingInterval
 */

var useHangulTypewriter = function useHangulTypewriter() {
  var texts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var waitingInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
  var disassembledTexts = texts.map(function (text) {
    return (0, _hangulJs.disassemble)(text).join('') + ' ';
  });

  var _useState = (0, _react.useState)(defaultState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var timerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    setState(defaultState);
  }, [texts]);
  (0, _react.useEffect)(function () {
    if (state.direction !== 0 && texts.length > 0) {
      var assembledFulltext = texts[state.index];
      var disassembledFulltext = disassembledTexts[state.index];
      var text = (state.direction > 0 ? disassembledFulltext : assembledFulltext).substr(0, state.cursor);
      timerRef.current = setTimeout(function () {
        setState(_objectSpread({}, state, {
          text: (0, _hangulJs.assemble)(text),
          cursor: text === disassembledFulltext ? assembledFulltext.length : state.cursor + state.direction,
          direction: text === disassembledFulltext ? DIRECTION_LEFT : state.direction < 0 && state.cursor < 0 ? DIRECTION_RIGHT : state.direction,
          index: state.direction < 0 && state.cursor < 0 ? (state.index + 1) % texts.length : state.index
        }));
      }, state.cursor >= disassembledFulltext.length ? waitingInterval : interval);
      return function () {
        return clearTimeout(timerRef.current);
      };
    }
  }, [state]);

  var pause = function pause() {
    if (state.direction === DIRECTION_NONE) return;
    setState(_objectSpread({}, state, {
      storedDirection: state.direction,
      direction: DIRECTION_NONE
    }));
  };

  var resume = function resume() {
    if (state.direction !== DIRECTION_NONE) return;
    setState(_objectSpread({}, state, {
      direction: state.storedDirection
    }));
  };

  var toggle = function toggle() {
    return state.direction !== DIRECTION_NONE ? pause() : resume();
  };

  var reset = function reset() {
    return setState(defaultState);
  };

  return [state.text, toggle, reset, pause, resume];
};

var _default = useHangulTypewriter;
exports["default"] = _default;