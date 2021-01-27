import dotenv from "dotenv";
import db from "./db";
import app from "./server";
dotenv.config();
const { PORT = 3001, DB_FORCE_SYNC } = process.env;

db.sequelize
  .sync({ force: DB_FORCE_SYNC === "true" })
  .then(() =>
    app.listen(PORT, () => console.log(`Server ready at port: ${PORT}`))
  );
