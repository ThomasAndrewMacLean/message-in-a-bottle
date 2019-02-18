import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import path from 'path';
import models, { sequelize } from './database/models';

const app = express();

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts'
  })
);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, '/public')));

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

const eraseDatabaseOnSync = false;
//const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createMockMessages();
  }

  app.listen(process.env.PORT, () => {
    console.log(
      `Message in a bottle app listening on port ${process.env.PORT}!`
    );
  });
});

const createMockMessages = async () => {
  await models.Message.create({
    text: 'Hello there'
  });
};
