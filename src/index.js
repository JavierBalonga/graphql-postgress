import dotenv from "dotenv";
import db from "./db";
import app from "./server";
const { PORT = 3001, DB_FORCE_SYNC } = dotenv.config().parsed;

db.sequelize
  .sync({ force: DB_FORCE_SYNC === "true" })
  .then(() =>
    app.listen(PORT, () => console.log(`Server ready at port: ${PORT}`))
  );
