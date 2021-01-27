import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Example extends Model {
    static associate(models) {}
  }
  Example.init(
    {
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "example",
    }
  );

  sequelize.addHook("afterBulkSync", (options) => {
    if (options.force) {
      Example.upsert({ value: "Preloaded Example" });
    }
  });
  return Example;
};
