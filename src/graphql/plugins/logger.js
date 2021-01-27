import chalk from "chalk";

export default {
  requestDidStart(requestContext) {
    const { operationName } = requestContext.request;
    if (operationName === "IntrospectionQuery") return;
    const start = new Date();

    return {
      willSendResponse({ request: { query }, response: { data }, errors }) {
        const logs = [];
        logs.push(chalk.cyan(query));
        if (errors) {
          logs.push(chalk.magenta("Errors:\n"));
          logs.push(
            errors
              .map((err, i) => chalk.magenta(`Error ${i}:\n${err.toString()}`))
              .join("\n\n")
          );
        } else {
          logs.push(chalk.green("response " + JSON.stringify(data)));
        }
        logs.push(chalk.yellow("\ntime " + (new Date() - start + "ms")));
        console.log(logs.join("\n"));
      },
    };
  },
};
