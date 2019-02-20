import 'dotenv/config';

import { sequelize } from './../database/models';
import { createMockMessages } from './../database/mocks';

const start = app => {
  // Set to true to clear database! 
  const eraseDatabaseOnSync = false;

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
};

export default start;
