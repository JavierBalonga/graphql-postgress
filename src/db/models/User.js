import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        // TODO ENCRIPTADO
        // TODO PASSWORD PATTERN
      },
      role: {
        type: DataTypes.ENUM(["admin", "guest"]),
        defaultValue: "guest",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  sequelize.addHook("afterBulkSync", (options) => {
    if (options.force) {
      User.upsert({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });
    }
  });
  return User;
};
