import supertest from "supertest";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import app from "../../server";
const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

describe("user schema", () => {
  const server = supertest(app);

  it("Query logIn: should logIn the user and return the user info and a token to auth", () =>
    server
      .post("/graphql")
      .send({
        operationName: "logIn",
        query: `
          query logIn {
            logIn(email: "${ADMIN_EMAIL}", password: "${ADMIN_PASSWORD}") {
              id
              email
            }
          }
        `,
        variables: {},
      })
      .then((res) => {
        expect(res.body.data).to.have.property("logIn");
        expect(res.body.data.logIn).to.have.property("id");
        expect(res.body.data.logIn.id).to.be.a("number");
        expect(res.body.data.logIn).to.have.property("email");
        expect(res.body.data.logIn.email).to.be.equal(ADMIN_EMAIL);
        expect(res.headers).to.have.property("authorization");
        const [type, credentials] = res.headers.authorization.split(" ");
        expect(type).to.be.equal("Bearer");
        const userId = Number(jwt.verify(credentials, JWT_SECRET));
        expect(userId).to.be.equal(res.body.data.logIn.id);
      }));

  it("Mutation singIn: should singIn the user and return the user info and a token to auth", () =>
    server
      .post("/graphql")
      .send({
        operationName: "singIn",
        query: `
          mutation singIn {
            singIn(email: "test@test.com", password: "1234567") {
              id
              email
            }
          }
        `,
        variables: {},
      })
      .then((res) => {
        expect(res.body.data).to.have.property("singIn");
        expect(res.body.data.singIn).to.have.property("id");
        expect(res.body.data.singIn.id).to.be.a("number");
        expect(res.body.data.singIn).to.have.property("email");
        expect(res.body.data.singIn.email).to.be.equal("test@test.com");
        expect(res.headers).to.have.property("authorization");
        const [type, credentials] = res.headers.authorization.split(" ");
        expect(type).to.be.equal("Bearer");
        const userId = Number(jwt.verify(credentials, JWT_SECRET));
        expect(userId).to.be.equal(res.body.data.singIn.id);
      }));
});
