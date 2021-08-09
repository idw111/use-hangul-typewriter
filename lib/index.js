"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var hangul_js_1 = require("hangul-js");
var getInitialState = function (texts) {
    return {
        texts: texts.map(function (text) { return hangul_js_1.disassemble(text).concat(' '); }),
        currentText: '',
        index: 0,
        cursor: 0,
        status: 'pending',
        direction: 'forward',
    };
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'pause':
            return __assign(__assign({}, state), { status: 'pending' });
        case 'resume':
            return __assign(__assign({}, state), { status: 'playing' });
        case 'reset':
            return __assign(__assign({}, state), { currentText: '', index: 0, cursor: 0, status: 'playing', direction: 'forward' });
        case 'tick':
            if (state.status === 'pending') {
                return state;
            }
            else if (state.status === 'playing') {
                if (state.direction === 'forward') {
                    if (state.cursor === state.texts[state.index].length)
                        return __assign(__assign({}, state), { direction: 'backward', status: 'waiting' });
                    var cursor = state.cursor + 1;
                    return __assign(__assign({}, state), { currentText: hangul_js_1.assemble(state.texts[state.index].slice(0, cursor)), cursor: cursor });
                }
                else if (state.direction === 'backward') {
                    if (state.cursor === 0)
                        return __assign(__assign({}, state), { direction: 'forward', status: 'waiting', index: (state.index + 1) % state.texts.length });
                    var cursor = state.cursor - 1;
                    return __assign(__assign({}, state), { currentText: hangul_js_1.assemble(state.texts[state.index].slice(0, cursor)), cursor: cursor });
                }
            }
            else if (state.status === 'waiting') {
                return __assign(__assign({}, state), { status: 'playing' });
            }
        default:
            return state;
    }
};
/**
 *
 * @param {Array} texts
 * @param {number} interval
 * @param {number} waitingInterval
 */
var useHangulTypewriter = function (texts, interval, waitingInterval) {
    if (texts === void 0) { texts = []; }
    if (interval === void 0) { interval = 50; }
    if (waitingInterval === void 0) { waitingInterval = 3000; }
    var _a = react_1.useReducer(reducer, getInitialState(texts)), state = _a[0], dispatch = _a[1];
    var timerRef = react_1.useRef(0);
    react_1.useEffect(function () {
        if (state.status !== 'pending') {
            timerRef.current = setTimeout(proceed, state.status === 'playing' ? interval : waitingInterval);
            return function () { return clearTimeout(timerRef.current); };
        }
    }, [texts, state.status, state.cursor]);
    var proceed = function () { return dispatch({ type: 'tick' }); };
    var pause = function () { return dispatch({ type: 'pause', timer: timerRef.current }); };
    var resume = function () { return dispatch({ type: 'resume' }); };
    var toggle = function () { return (state.status !== 'pending' ? pause() : resume()); };
    var reset = function () { return dispatch({ type: 'reset' }); };
    return [state.currentText, toggle, reset, pause, resume];
};
exports.default = useHangulTypewriter;
