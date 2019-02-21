import models from '../database/models';
import { encrypt, decrypt } from '../crypto/crypto';
import Joi from 'joi';

const schemaEncrypt = Joi.object().keys({
  key: Joi.string().required(),
  message: Joi.string().required(),
  hint: Joi.string().required()
});
const schemaDecrypt = Joi.object().keys({
  key: Joi.string().required(),
  text: Joi.string().required()
});

const routes = app => {
  app.get('/ping', (req, res) => {
    res.status(200).json('pong');
  });

  app.get('/', (req, res) => {
    res.render('index', { title: 'Message in a bottle', date: +new Date().getFullYear() });
  });

  app.get('/messages', async (req, res) => {
    const messages = await models.Message.findAll();
    res.render('messages', { messages, date: +new Date().getFullYear() });
  });

  app.get('/message/:messageId', async (req, res) => {
    const messageId = req.params.messageId;
    try {
      const message = await models.Message.findById(messageId);
      res.render('message', { message, date: +new Date().getFullYear() });
    } catch (error) {
      res.render('error', {});
    }
  });

  app.post('/message', (req, res) => {
    const { key, message, hint } = req.body;

    const result = Joi.validate({ key, message, hint }, schemaEncrypt);
    if (result.error) {
      return res.status(500).send(result.error);
    }
    const encryptedMessage = encrypt(message, key);

    return models.Message.create({
      text: encryptedMessage,
      hint
    })
      .then(message => res.render('message', { message, newMessage: true, date: +new Date().getFullYear() }))
      .catch(error => res.status(400).send(error));
  });

  app.post('/decrypt', (req, res) => {
    const { key, text } = req.body;
    const result = Joi.validate({ key, text }, schemaDecrypt);
    if (result.error) {
      return res.status(500).send(result.error);
    }

    const decryptedMessage = decrypt(text, key);
    res.render('decrypted', { decryptedMessage, date: +new Date().getFullYear() });
  });
};

export default routes;
