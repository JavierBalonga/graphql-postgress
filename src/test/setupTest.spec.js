import db from "../db";

export const mochaGlobalSetup = () =>
  db.sequelize
    .sync({ force: true })
    .then((Sequelize) => console.log("DATABASE:", Sequelize.config.database));
