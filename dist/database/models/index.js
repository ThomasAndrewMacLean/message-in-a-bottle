"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sequelize = void 0;

require("core-js/modules/web.dom.iterable");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("./../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.default(_config.default['production']);
exports.sequelize = sequelize;
const models = {
  Message: sequelize.import('./message')
};
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
var _default = models;
exports.default = _default;