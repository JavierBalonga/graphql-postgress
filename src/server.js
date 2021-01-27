import express from "express";
import graphql from "./graphql";

const app = express();

app.get("/", (req, res) => res.redirect("/graphql"));

graphql.applyMiddleware({ app });

export default app;
