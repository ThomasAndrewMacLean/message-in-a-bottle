"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _models = require("./../database/models");

var _mocks = require("./../database/mocks");

const start = app => {
  const eraseDatabaseOnSync = false; //const eraseDatabaseOnSync = true;

  _models.sequelize.sync({
    force: eraseDatabaseOnSync
  }).then(() => {
    if (eraseDatabaseOnSync) {
      (0, _mocks.createMockMessages)();
    }

    app.listen(process.env.PORT, () => {
      console.log(`Message in a bottle app listening on port ${process.env.PORT}!`);
    });
  });
};

var _default = start;
exports.default = _default;