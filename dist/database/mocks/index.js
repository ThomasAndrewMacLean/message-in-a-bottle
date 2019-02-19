"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockMessages = void 0;

var _models = _interopRequireDefault(require("./../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMockMessages = async () => {
  await _models.default.Message.create({
    text: 'Hello there'
  });
};

exports.createMockMessages = createMockMessages;