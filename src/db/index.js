import Sequelize from "sequelize";
import config from "./config.js";
import db from "./models";

const sequelize = new Sequelize(config);

for (const modelName in db) {
  db[modelName] = db[modelName](sequelize);
  if (db[modelName].associate) db[modelName].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
