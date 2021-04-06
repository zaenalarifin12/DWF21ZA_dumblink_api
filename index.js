require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const indexRoute = require("./routes/index");

const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", indexRoute);
app.use("/uploads", express.static("uploads"));

app.listen(
    process.env.PORT ||
    5000, () => console.log(`run in port ${process.env.PORT}`))
