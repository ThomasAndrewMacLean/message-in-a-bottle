"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _setup = _interopRequireDefault(require("./setup"));

var _start = _interopRequireDefault(require("./setup/start"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _setup.default)(app, _express.default, __dirname);
(0, _routes.default)(app);
(0, _start.default)(app);