import { auth, authTypeDefs } from "./auth";

export const directiveTypeDefs = [authTypeDefs];
export const directiveResolvers = { auth };
