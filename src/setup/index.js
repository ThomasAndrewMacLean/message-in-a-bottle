import logger from 'morgan';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import path from 'path';

const setup = (app, express, rootFolder) => {
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: rootFolder + '/views/layouts'
    })
  );

  app.set('views', path.join(rootFolder, '/views'));
  app.set('view engine', 'hbs');

  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.use(express.static(path.join(rootFolder, '/public')));
};
export default setup;
