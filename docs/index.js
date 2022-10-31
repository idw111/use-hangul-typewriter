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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var esm_1 = __importDefault(require("../dist/esm"));
var texts = [
    ['치키치키 차카차카 초코초코초', '나쁜일을 하면은~', '치키치키 차카차카 초코초코초', '우리에게 들키지~'],
    ['가나다라마바사', '아자차카타파하'],
];
var Example = function (_a) {
    var _b = (0, react_1.useState)(0), index = _b[0], setIndex = _b[1];
    var _c = (0, esm_1["default"])(texts[index], 60, 1000), text = _c[0], pause = _c[1], resume = _c[2], toggle = _c[3];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "typewriter", style: { fontSize: 24, lineHeight: '40px' } }, { children: [text, "\u00A0"] })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: pause }, { children: "pause" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: resume }, { children: "resume" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return setIndex((index + 1) % texts.length); } }, { children: "change texts" }))] }));
};
window.onload = function () {
    (0, react_dom_1.render)((0, jsx_runtime_1.jsx)(Example, {}), document.getElementById('root'));
};
