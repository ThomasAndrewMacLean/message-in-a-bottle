import Sequelize from 'sequelize';
import config from './../config';

const sequelize = new Sequelize(config['production']);

const models = {
  Message: sequelize.import('./message')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
