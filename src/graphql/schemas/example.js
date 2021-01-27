import { gql } from "apollo-server-express";

export const exampleTypeDefs = gql`
  type Query {
    examples: [Example]
  }
  type Mutation {
    createExample(value: String!): ExampleRespond
    updateExample(id: Int!, value: String!): ExampleRespond
    deleteExample(id: Int): ExampleRespond
  }
  type Example {
    id: Int
    value: String
  }
  type ExampleRespond {
    example: Example
    success: Boolean
    query: Query
  }
`;

export const exampleResolvers = {
  Query: {
    examples: (_, {}, { dataSources: { db } }) => db.Example.findAll(),
  },

  Mutation: {
    createExample: (_, { value }, { dataSources: { db } }) =>
      db.Example
        .findOrCreate({ where: { value } })
        .then(([example, success]) => ({ example, success, query: {} })),

    updateExample: (_, { id, value }, { dataSources: { db } }) =>
      db.Example
        .update( { value }, { where: { id }, returning: true })
        .then(([_, [example]]) => ({ example, success: !!example, query: {} })),

    deleteExample: (_, { id }, { dataSources: { db } }) =>
      db.Example
        .findByPk(id)
        .then((example) => Promise.all([example, example && example.destroy()]))
        .then(([example, destroy]) => ({ example, success: !!destroy, query: {}})),
  },
};
