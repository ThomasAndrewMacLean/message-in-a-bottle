import models from './../models';

export const createMockMessages = async () => {
  await models.Message.create({
    text: 'b0ed6ce34ab2531687c7160c0b61b5da40fab22c',
    hint: 'waar dacht ik aan?'
  });
};
