import dotenv from "dotenv";
import { cyan, blue } from "chalk";
import { format } from "sql-formatter";
dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_LOGGING,
  NODE_ENV,
} = process.env;

const defaultConfig = {
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  logging:
    DB_LOGGING === "true"
      ? (sql) => console.log(cyan("\n --- SQL --- \n") + blue(format(sql)))
      : false,
};

const config = {
  development: { ...defaultConfig },

  test: {
    ...defaultConfig,
    database: `${DB_NAME}_test`,
  },

  production: { ...defaultConfig },
}[NODE_ENV || "development"];

export default config || defaultConfig;
