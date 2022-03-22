// const express = require("express");
import express from "express";
import * as db from "./queries.js";
const app = express();
const port = 3000;
// const db = require('./queries')

app.use(express.json());
app.use(
express.urlencoded({
extended: true,
}));    

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
    });

app.get('/projekt', db.getUsers)
app.get('/projekt/:id', db.getUserById)
app.post('/projekt', db.createUser)
app.put('/projekt/:id', db.updateUser)
app.delete('/projekt/:id', db.deleteUser)

    app.listen(port, () => {
    console.log(`App running on port ${port}.`);
    });