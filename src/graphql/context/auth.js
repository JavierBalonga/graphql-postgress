import jwt from "jsonwebtoken";
import chalk from "chalk";
import db from "../../db";

export default (context) => {
  const authorization  = context.req && context.req.headers.authorization;
  const [type, credentials] = authorization ? authorization.split(" ") : [];
  if (type === "Bearer") {
    const userId = jwt.verify(
      credentials,
      process.env.JWT_SECRET,
      (err, userId) => (err ? console.log(chalk.magenta(err)) : userId)
    );
    if (userId) {
      return db.User.findByPk(userId).then(
        (user) => ((context.user = user), context)
      );
    }
  }
  return context;
};
