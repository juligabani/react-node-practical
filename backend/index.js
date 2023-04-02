require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/login", require('./api/Login'));
app.use("/api/register", require('./api/Registration'));

app.listen(3001, () => {
    console.log(`Server listening on ${3001}`);
});