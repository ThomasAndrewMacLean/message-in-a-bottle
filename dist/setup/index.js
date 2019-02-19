"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setup = (app, express, rootFolder) => {
  app.engine('hbs', (0, _expressHandlebars.default)({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: rootFolder + '/views/layouts'
  }));
  app.set('views', _path.default.join(rootFolder, '/views'));
  app.set('view engine', 'hbs');
  app.use((0, _morgan.default)('dev'));
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: false
  }));
  app.use(express.static(_path.default.join(rootFolder, '/public')));
};

var _default = setup;
exports.default = _default;