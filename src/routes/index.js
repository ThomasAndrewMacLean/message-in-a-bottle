import models from '../database/models';
import { encrypt, decrypt } from '../crypto/crypto';

const routes = app => {
  app.get('/ping', (req, res) => {
    res.status(200).json('pong');
  });

  app.get('/', (req, res) => {
    res.render('index', { title: 'Message in a bottle' });
  });

  app.get('/messages', async (req, res) => {
    const messages = await models.Message.findAll();
    res.render('messages', { messages });
  });

  app.get('/message/:messageId', async (req, res) => {
    const messageId = req.params.messageId;
    try {
      const message = await models.Message.findById(messageId);
      res.render('message', { message });
    } catch (error) {
      res.render('error', {});
    }
  });

  app.post('/message', (req, res) => {
    const { key, message, hint } = req.body;

    const encryptedMessage = encrypt(message, key);

    return models.Message.create({
      text: encryptedMessage,
      hint
    })
      .then(message => res.render('message', { message }))
      .catch(error => res.status(400).send(error));
  });

  app.post('/decrypt', (req, res) => {
    const { key, text } = req.body;
    const decryptedMessage = decrypt(text, key);
    res.render('decrypted', {decryptedMessage});
  });
};

export default routes;
