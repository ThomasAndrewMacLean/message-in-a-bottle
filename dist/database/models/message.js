"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    text: DataTypes.STRING
  });
  return Message;
};

var _default = message;
exports.default = _default;