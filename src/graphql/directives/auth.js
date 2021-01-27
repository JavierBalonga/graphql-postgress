import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  directive @auth(requires: [Role] = [admin]) on OBJECT | FIELD_DEFINITION
  enum Role {
    admin
  }
`;
export function auth(next, src, { requires }, { user }) {
  if (!user || !requires.includes(user.role)) return;
  return next();
}
