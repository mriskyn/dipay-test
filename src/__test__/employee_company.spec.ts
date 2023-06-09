import * as request from "supertest";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import app from "../app";

let endpointCompany = "/api/companies";
let endpointEmployee = "/api/employees";
let server;
beforeAll(async () => {
  const port = 6004;
  server = app.listen(port, () =>
    console.log("server run on testing port:", port)
  );
});
describe("Company - Employee Test Case", () => {
  let company_id = "";
  let employee_id = "";

  describe("Add Company", () => {
    test("201 - Success", function (done) {
      const body = {
        company_name: "company 1",
        telephone_number: "081231232",
        address: "jl kesehatan nomor 50",
      };
      request(app)
        .post(endpointCompany)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CREATED;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data).toHaveProperty("id", res.body.data.id);
          company_id = res.body.data.id;
          done();
        });
    });

    test("409 - Conflict", function (done) {
      const body = {
        company_name: "company 1",
        telephone_number: "081231232",
        address: "jl kesehatan nomor 50",
      };
      request(app)
        .post(endpointCompany)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CONFLICT;
          expect(res.body.message).toEqual("Company Name already exist");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });

    test("400 - Invalid Request", function (done) {
      const body = {
        company_name: "",
        telephone_number: "081231232",
        address: "jl kesehatan nomor 50",
      };

      request(app)
        .post(endpointCompany)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.BAD_REQUEST;
          expect(res.body.message).toEqual("company_name is required");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe("Get Companies", () => {
    test("200 - Success", function (done) {
      request(app)
        .get(endpointCompany)
        .end((err, res) => {
          if (err) throw err;

          // console.log({res})
          const statusCode = StatusCodes.OK;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data).toHaveProperty("count", res.body.data.count);
          expect(res.body.data.count).toEqual(res.body.data.rows.length);
          done();
        });
    });

    test.skip("422 - Data not found", function (done) {
      request(app)
        .get(endpointCompany)
        .end((err, res) => {
          if (err) throw err;
          const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
          expect(res.body.message).toEqual("Data is not found");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe.skip("Set Company Active", () => {
    test("200 - Success", function (done) {
      console.log({ company_id });
      request(app)
        .put(`${endpointCompany}/${company_id}/set-active`)
        .end((err, res) => {
          if (err) throw err;

          console.log("res.body", res.body);

          expect(res.body.message).toEqual("Success");
          expect(res.status).toEqual(StatusCodes.OK);
          expect(res.body.code).toEqual(String(StatusCodes.CREATED));
          expect(res.body.status).toEqual(StatusCodes.CREATED);
          expect(res.body.data).toHaveProperty("id", company_id);
          expect(res.body.data).toHaveProperty("is_active", true);
          done();
        });
    }, 10000);

    test("422 - Data not found", function (done) {
      request(app)
        .put(`${endpointCompany}/${company_id}/set-active`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
          expect(res.body.message).toEqual("Data is not found");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe("Get Employees by Company Id", () => {
    test("200 - Success", function (done) {
      request(app)
        .get(`${endpointCompany}/${company_id}/employees`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.OK;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data).toHaveProperty("id", res.body.data.id);
          expect(res.body.data).toHaveProperty(
            "company_name",
            res.body.data.company_name
          );
          expect(res.body.data).toHaveProperty(
            "is_active",
            res.body.data.is_active
          );
          done();
        });
    });

    test("422 - Data not found", function (done) {
      let fakeCompanyId = "6481ed9072b121f11ab9b07e";
      request(app)
        .get(`${endpointCompany}/${fakeCompanyId}/employees`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
          expect(res.body.message).toEqual("Data is not found");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe("Add Employee", () => {
    test("201 - Success", function (done) {
      const body = {
        name: "risky nugraha",
        email: "riskydr.n@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };
      request(app)
        .post(`${endpointCompany}/${company_id}/employees`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CREATED;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data.company_id).toEqual(company_id);
          expect(res.body.data).toHaveProperty("id", res.body.data.id);

          employee_id = res.body.data.id;
          done();
        });
    });

    test("409 - Conflict", function (done) {
      const body = {
        name: "risky nugraha",
        email: "riskydr.n@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };
      request(app)
        .post(`${endpointCompany}/${company_id}/employees`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CONFLICT;
          expect(res.body.message).toEqual("Email already exist");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });

    test("400 - Invalid Request", function (done) {
      const body = {
        name: "",
        email: "test@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };

      request(app)
        .post(`${endpointCompany}/${company_id}/employees`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.BAD_REQUEST;
          expect(res.body.message).toEqual("name is required");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });
  describe("Get Employee By ID", () => {
    test("200 - Success", function (done) {
      request(app)
        .get(`${endpointEmployee}/${employee_id}`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.OK;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data).toHaveProperty("id", res.body.data.id);
          expect(res.body.data).toHaveProperty("name", res.body.data.name);
          expect(res.body.data).toHaveProperty(
            "phone_number",
            res.body.data.phone_number
          );
          expect(res.body.data).toHaveProperty(
            "jobtitle",
            res.body.data.jobtitle
          );
          done();
        });
    });

    test("422 - Data not found", function (done) {
      let fakeEmployeeId = "6482f1d351e909d2d6ba1526";
      request(app)
        .get(`${endpointEmployee}/${fakeEmployeeId}`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
          expect(res.body.message).toEqual("Data is not found");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe("Update Employee", () => {
    test("201 - Success", function (done) {
      const body = {
        name: "muhammad risky nugraha",
        email: "muhammadrisky83@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };
      request(app)
        .put(`${endpointCompany}/${company_id}/employees/${employee_id}`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CREATED;
          expect(res.body.message).toEqual("Success");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          expect(res.body.data.company_id).toEqual(company_id);
          expect(res.body.data).toHaveProperty("id", res.body.data.id);
          done();
        });
    });

    test("409 - Conflict", function (done) {
      const body = {
        name: "risky nugraha",
        email: "muhammadrisky83@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };
      request(app)
        .put(`${endpointCompany}/${company_id}/employees/${employee_id}`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.CONFLICT;
          expect(res.body.message).toEqual("Email already exist");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });

    test("400 - Invalid Request", function (done) {
      const body = {
        name: "",
        email: "test@gmail.com",
        phone_number: "0813145867",
        jobtitle: "staff",
      };

      request(app)
        .put(`${endpointCompany}/${company_id}/employees/${employee_id}`)
        .send(body)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.BAD_REQUEST;
          expect(res.body.message).toEqual("name is required");
          expect(res.body.code).toEqual(String(statusCode));
          expect(res.body.status).toEqual(statusCode);
          done();
        });
    });
  });

  describe("Delete Employee By ID", () => {
    test("204 - Success", function (done) {
      request(app)
        .delete(`${endpointEmployee}/${employee_id}`)
        .end((err, res) => {
          if (err) throw err;

          const statusCode = StatusCodes.NO_CONTENT;
          expect(res.status).toEqual(statusCode);
          done();
        });
    });
  });
});

afterAll(async () => {
  server.close();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }
  await mongoose.connection.close();
});
