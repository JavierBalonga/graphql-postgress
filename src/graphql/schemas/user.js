import { gql } from "apollo-server-express";
import jwt from "jsonwebtoken";

export const userTypeDefs = gql`
  type Query {
    users: [User] @auth(requires: [admin])
    logIn(email: String!, password: String!): User
  }
  type Mutation {
    singIn(email: String!, password: String!): User
  }
  type User {
    id: Int
    email: String
  }
`;

export const userResolvers = {
  Query: {
    users: (_, {}, { dataSources: { db } }) => {
      return db.User.findAll();
    },
    logIn: (_, { email, password }, { res, dataSources: { db } }) =>
      db.User
        .findOne({ where: { email, password } })
        .then((user) => {
          res.set(
            "Authorization",
            "Bearer " + jwt.sign(user.id, process.env.JWT_SECRET)
          );
          return user;
        }),
  },
  Mutation: {
    singIn: (_, { email, password }, { res, dataSources: { db } }) =>
      db.User
        .findOrCreate({ where: { email }, defaults: { password }})
        .then(([user]) => {
          res.set(
            "Authorization",
            "Bearer " + jwt.sign(user.id, process.env.JWT_SECRET)
          );
          return user
        }),
  },
};
