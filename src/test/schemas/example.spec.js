import supertest from "supertest";
import { expect } from "chai";
import app from "../../server";

describe("example schema", () => {
  const server = supertest(app);

  it("Query examples: should list the examples", () =>
    server
      .post("/graphql")
      .send({
        operationName: "getExamples",
        query: `
          query getExamples{
            examples {
              id
              value
            }
          }
        `,
        variables: {},
      })
      .then(({ body: { data } }) => {
        expect(data).to.have.property("examples");
        expect(data.examples).to.be.an("array").that.is.not.empty;
        expect(data.examples[0]).to.have.property("id");
        expect(data.examples[0]).to.have.property("value");
      }));

  it("Mutation createExample: should create a example", () =>
    server
      .post("/graphql")
      .send({
        operationName: "createExample",
        query: `
          mutation createExample {
            createExample(value: "new example") {
              example {
                id
                value
              }
              success
              query {
                examples {
                  id
                  value
                }
              }
            }
          }
        `,
        variables: {},
      })
      .then(({ body: { data } }) => {
        expect(data).to.have.property("createExample");
        expect(data.createExample).to.have.property("example");
        expect(data.createExample.example).to.have.property("id");
        expect(data.createExample.example).to.have.property("value");
        expect(data.createExample.example.id).to.be.a("number");
        expect(data.createExample.example.value).to.be.equal("new example");
        expect(data.createExample).to.have.property("success");
        expect(data.createExample.success).to.be.a("boolean");
        expect(data.createExample).to.have.property("query");
        expect(data.createExample.query).to.have.property("examples");
        expect(data.createExample.query.examples).to.include.deep.members([
          { id: 2, value: "new example" },
        ]);
      }));

  it("Mutation updateExample: should update a example", () =>
    server
      .post("/graphql")
      .send({
        operationName: "updateExample",
        query: `
          mutation updateExample {
            updateExample(id: 1, value: "edited example") {
              example {
                id
                value
              }
              success
              query {
                examples {
                  id
                  value
                }
              }
            }
          }
        `,
        variables: {},
      })
      .then(({ body: { data } }) => {
        expect(data).to.have.property("updateExample");
        expect(data.updateExample).to.have.property("example");
        expect(data.updateExample.example).to.have.property("id");
        expect(data.updateExample.example).to.have.property("value");
        expect(data.updateExample.example.id).to.be.equal(1);
        expect(data.updateExample.example.value).to.be.equal("edited example");
        expect(data.updateExample).to.have.property("success");
        expect(data.updateExample.success).to.be.a("boolean");
        expect(data.updateExample).to.have.property("query");
        expect(data.updateExample.query).to.have.property("examples");
        expect(data.updateExample.query.examples).to.include.deep.members([
          { id: 1, value: "edited example" },
        ]);
      }));

  it("Mutation deleteExample: should delete a example", () =>
    server
      .post("/graphql")
      .send({
        operationName: "deleteExample",
        query: `
          mutation deleteExample {
            deleteExample(id: 1) {
              example {
                id
                value
              }
              success
              query {
                examples {
                  id
                  value
                }
              }
            }
          }
        `,
        variables: {},
      })
      .then(({ body: { data } }) => {
        expect(data).to.have.property("deleteExample");
        expect(data.deleteExample).to.have.property("example");
        expect(data.deleteExample.example).to.have.property("id");
        expect(data.deleteExample.example).to.have.property("value");
        expect(data.deleteExample.example.id).to.be.equal(1);
        expect(data.deleteExample.example.value).to.be.equal("edited example");
        expect(data.deleteExample).to.have.property("success");
        expect(data.deleteExample.success).to.be.a("boolean");
        expect(data.deleteExample).to.have.property("query");
        expect(data.deleteExample.query).to.have.property("examples");
        expect(data.deleteExample.query.examples).to.not.include.deep.members([
          { id: 1, value: "edited example" },
        ]);
      }));
});
