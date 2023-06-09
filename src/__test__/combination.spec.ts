import * as supertest from "supertest";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import app from "../app";

let server;
let endpoint = "/api/combination";
describe("Combination Test Case", () => {
  beforeAll(async () => {
    const port = 6002;
    server = app.listen(port, () =>
      console.log("server run on testing port:", port)
    );
  });

  it("200 : Success", function (done) {
    supertest(app)
      .post(endpoint)
      .send({
        n: 4,
        r: 2,
      })
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.OK;
        expect(res.body.message).toEqual("Success");
        expect(res.body.status).toEqual(statusCode);
        expect(res.body.code).toEqual(String(statusCode));
        expect(res.body.data.result).toEqual(6);
        done();
      });
  });

  it("400 : Invalid Request", function (done) {
    supertest(app)
      .post(endpoint)
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.BAD_REQUEST;
        expect(res.body.message).toEqual("n or r is required");
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
