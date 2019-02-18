import models from './../models';

export const createMockMessages = async () => {
  await models.Message.create({
    text: 'Hello there'
  });
};
