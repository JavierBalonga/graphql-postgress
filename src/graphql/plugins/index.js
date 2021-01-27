import logger from "./logger";

const plugins = [];

if (process.env.NODE_ENV === "development") plugins.push(logger);

export default [plugins];
