import * as supertest from "supertest";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import app from "../app";

let server;
let endpoint = "/api/fibonacci";
describe("Fibonacci Test Case", () => {
  beforeAll(async () => {
    const port = 6001;
    server = app.listen(port, () =>
      console.log("server run on testing port:", port)
    );
  });
  test("200 : Success", function (done) {
    supertest(app)
      .post(endpoint)
      .send({ n: 50 })
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.OK;
        expect(res.body.message).toEqual("Success");
        expect(res.body.status).toEqual(statusCode);
        expect(res.body.code).toEqual(String(statusCode));
        expect(res.body.data.result).toEqual("0 1 1 2 3 5 8 13 21 34");
        done();
      });
  });

  test("400 : Invalid Request", function (done) {
    supertest(app)
      .post(endpoint)
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.BAD_REQUEST;
        expect(res.body.message).toEqual("n is required");
        expect(res.body.status).toEqual(statusCode);
        expect(res.body.code).toEqual(String(statusCode));
        done();
      });
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
});
