import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema, mergeTypeDefs, mergeResolvers } from "graphql-tools";

import { typeDefs, resolvers } from "./schemas";
import context from "./context";
import plugins from "./plugins";
import { directiveTypeDefs, directiveResolvers } from "./directives";
import db from "../db"

export default new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: mergeTypeDefs(typeDefs.concat(directiveTypeDefs)),
    resolvers: mergeResolvers(resolvers),
    directiveResolvers,
  }),
  context,
  plugins,
  dataSources: () => ({ db }),
  /* the following lines enable the playground in production */
  /* in a real project it should not be done */
  introspection: true,
  playground: true,
});
