const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { ChildProcess } = require("child_process");
const blogsRouter = require("./controllers/blogs");
require("dotenv").config();
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Mongoose connection established");
  })
  .catch((e) => {
    logger.error(`error connection to MongoDB: ${e.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
