import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import path from 'path';

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

app.post('/send', (req, res) => {
    const key = req.body.key;
    res.render('send', { key });
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () =>
    console.log(`Message in a bottle app listening on port ${port}!`)
);
