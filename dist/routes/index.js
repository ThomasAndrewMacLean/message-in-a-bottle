"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../database/models"));

var _crypto = require("../crypto/crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = app => {
  app.get('/ping', (req, res) => {
    res.status(200).json('pong');
  });
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Message in a bottle'
    });
  });
  app.get('/messages', async (req, res) => {
    const messages = await _models.default.Message.findAll();
    res.render('messages', {
      messages
    });
  });
  app.get('/message/:messageId', async (req, res) => {
    const messageId = req.params.messageId;

    try {
      const message = await _models.default.Message.findById(messageId);
      res.render('message', {
        message
      });
    } catch (error) {
      res.render('error', {});
    }
  });
  app.post('/send', (req, res) => {
    const _req$body = req.body,
          key = _req$body.key,
          message = _req$body.message;
    const encryptedMessage = (0, _crypto.encrypt)(message, key);
    return _models.default.Message.create({
      text: encryptedMessage
    }).then(todo => res.render('send', {
      todo,
      key
    })).catch(error => res.status(400).send(error));
  });
  app.post('/decrypt', (req, res) => {
    const _req$body2 = req.body,
          key = _req$body2.key,
          text = _req$body2.text;
    const decryptedMessage = (0, _crypto.decrypt)(text, key);
    res.status(200).json({
      decryptedMessage
    });
  });
};

var _default = routes;
exports.default = _default;