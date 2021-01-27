import { userTypeDefs, userResolvers } from "./user";
import { exampleTypeDefs, exampleResolvers } from "./example";

export const typeDefs = [userTypeDefs, exampleTypeDefs];
export const resolvers = [userResolvers, exampleResolvers];
