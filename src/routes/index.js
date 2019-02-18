import models from '../database/models';

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

  app.post('/send', (req, res) => {
    const { key, message } = req.body;
    return models.Message.create({
      text: message
    })
      .then(todo => res.render('send', { todo, key }))
      .catch(error => res.status(400).send(error));
  });
};

export default routes;
