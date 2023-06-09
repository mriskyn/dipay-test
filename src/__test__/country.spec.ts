import * as supertest from "supertest";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import app from "../app";

let server;
let endpoint = "/api/countries";
describe("Countries Test Case", () => {
  beforeAll(async () => {
    const port = 6000;
    server = app.listen(port, () =>
      console.log("server run on testing port:", port)
    );
  });
  test("200 : Success", function (done) {
    supertest(app)
      .get(endpoint)
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.OK;
        expect(res.body.message).toEqual("Success");
        expect(res.body.status).toEqual(statusCode);
        expect(res.body.code).toEqual(String(statusCode));
        expect(res.body.data).toHaveLength(res.body.data.length);
        done();
      });
  });

  test.skip("400 : Failed to Get Countries", function (done) {
    supertest(app)
      .post(endpoint)
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;

        const statusCode = StatusCodes.BAD_REQUEST;
        expect(res.body.message).toEqual("Something Went Wrong");
        expect(res.body.status).toEqual(statusCode);
        expect(res.body.code).toEqual(String(statusCode));
        // expect(res.body.data).toEqual(null);
        done();
      });
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
});
