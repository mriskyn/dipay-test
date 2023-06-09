require("express-async-errors");
import * as express from "express";
import { config } from "dotenv";
import * as helmet from "helmet";
import * as cors from "cors";
import * as xss from "xss-clean";
import * as mongoSanitize from "express-mongo-sanitize";
import * as process from "process";

import connectDB from "./db/connect";

import companyRouter from "./routes/companyRoutes";
import employeeRouter from "./routes/employeeRoutes";
import fibonacciRouter from "./routes/fibonacciRoutes";
import combinationRouter from "./routes/combinationRoutes";
import countryRouter from "./routes/countryRoutes";

import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";

config();
const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/companies", companyRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/fibonacci", fibonacciRouter);
app.use("/api/combination", combinationRouter);
app.use("/api/countries", countryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    }

    if (process.env.NODE_ENV === "testing") {
      await connectDB(process.env.MONGO_URI_TEST);
    } else {
      await connectDB(process.env.MONGO_URI);
    }

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
