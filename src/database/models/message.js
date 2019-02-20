const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    text: DataTypes.STRING,
    hint: DataTypes.STRING
  });

  return Message;
};

export default message;
