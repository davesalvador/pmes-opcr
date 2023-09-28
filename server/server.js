import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import bodyParser from "body-parser";
// const express = require("express");

const app = express();

// Set the maximum allowed size for request payloads to 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

/**midllewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack

const port = 8080;

/**HTTP GET REQUREST */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

/**API routes*/

app.use("/api", router);

/**Start server only when have valid connection*/

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
