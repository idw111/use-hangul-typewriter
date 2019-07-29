"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _hangulJs = require("hangul-js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      text = _useState2[0],
      setText = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      index = _useState4[0],
      setIndex = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      cursor = _useState6[0],
      setCursor = _useState6[1];

  var _useState7 = (0, _react.useState)(1),
      _useState8 = _slicedToArray(_useState7, 2),
      direction = _useState8[0],
      setDirection = _useState8[1];

  var _useState9 = (0, _react.useState)(1),
      _useState10 = _slicedToArray(_useState9, 2),
      storedDirection = _useState10[0],
      setStoredDirection = _useState10[1];

  (0, _react.useEffect)(function () {
    if (direction !== 0 && texts.length > 0) {
      var assembledFulltext = texts[index];
      var disassembledFulltext = disassembledTexts[index];

      var _text = (direction > 0 ? disassembledFulltext : assembledFulltext).substr(0, cursor);

      var timer = setTimeout(function () {
        setText((0, _hangulJs.assemble)(_text));
        setCursor(cursor + direction);

        if (_text === disassembledFulltext) {
          setDirection(-1);
          setCursor(assembledFulltext.length);
        }

        if (direction < 0 && cursor < 0) {
          setDirection(1);
          setIndex((index + 1) % texts.length);
        }
      }, cursor >= disassembledFulltext.length ? waitingInterval : interval);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [index, cursor, direction]);

  var pause = function pause() {
    return setStoredDirection(direction) || setDirection(0);
  };

  var resume = function resume() {
    return setDirection(storedDirection);
  };

  var toggle = function toggle() {
    return direction !== 0 ? pause() : resume();
  };

  var reset = function reset() {
    setIndex(0);
    setCursor(0);
    setDirection(1);
  };

  return [text, toggle, reset, pause, resume];
};

var _default = useHangulTypewriter;
exports["default"] = _default;