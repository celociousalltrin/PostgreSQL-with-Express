import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
import { getFrontEndAppURL } from "./utils/common-function";
import { responseMessage } from "./utils/response-message";
import { notFoundResponse } from "./utils/response-handler";
import MorganStreamRequest from "./utils/request-logger/morgan-stream";

import apiRouter from "./routes";

config();

const app = express();

app.use(MorganStreamRequest);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: getFrontEndAppURL(process.env.NODE_ENV as string),
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "public", "css")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    notFoundResponse(res, responseMessage("ER001"));
  } else {
    res.send("404 Requested Page Not Found");
  }
});

const port: number = Number(process.env.PORT) || 5555;

app.listen(port, () => console.log(`Server is Listening on ${port}`));
