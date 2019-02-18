import express from 'express';
import setUpRoutes from './routes';
import setUpExpress from './setup';
import start from './setup/start';

const app = express();

setUpExpress(app, express, __dirname);
setUpRoutes(app);
start(app);
