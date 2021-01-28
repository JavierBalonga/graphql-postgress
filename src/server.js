import express from "express";
import cors from "cors";
import graphql from "./graphql";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.redirect("/graphql"));

graphql.applyMiddleware({ app });

export default app;
