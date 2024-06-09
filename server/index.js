import express from "express";
import dotenv from "dotenv/config";
import colors from "colors";
import mongoose from "mongoose";
import catRouter from "./Routes/catRouter.js";
import todosRouter from "./Routes/todoRouter.js";
import cors from "cors";

// @disc: globals
const PORT = process.env.PORT;
const DB = process.env.DB_URL;
const FRE_URL = process.env.FEND_URL;
const app = express();

// @Desc: allow Cors

console.log(FRE_URL);
// const corsOptions = {
//   origin: FRE_URL, // Replace with your actual frontend origin
//   methods: "GET,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow cookies for authentication
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(
  cors({
    origin: FRE_URL, // Replace with your actual frontend origin
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies for authentication
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
// app.use(cors({ origin: true }));

// @Disc: parse data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// @Desc: Routes
//
// @Desc Todos List
// @Url: /api/todos
// @From: todos router > folder routes
app.use(todosRouter);

// @Desc categories List
// @Url: /api/categories
// @From: cats router > folder routes
app.use(catRouter);

// @Desc: handel not found pages
app.all("*", (req, res) => {
  res.status(404).json({
    sucess: false,
    data: {
      msg: "page not found",
    },
  });
});

// @Disc: connect db & listen to server
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}`.underline.red);
    });
  })
  .catch(err => {
    console.log("server error: ", err.message);
  });
