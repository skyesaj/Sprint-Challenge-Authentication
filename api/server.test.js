const ask = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("server", () => {
  it("test running", () => {
    expect(true).toBe(true);
  });
});

describe("POST /register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should make a user", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" })
      .then(user => {
        expect(user.body.username).toBe("skyes");
      });
  });
  it("returns status 201", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "testing" })
      .then(response => {
        expect(response.status).toBe(201);
      });
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("return 200 status", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" })
      .then(res => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "skyes", password: "pie" })
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
  });
  it("return token", () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" })
      .then(user => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "skyes", password: "pie" })
          .then(response => {
            expect(response.body).toEqual({ token: response.body.token });
          });
      });
  });
});

describe("GET /jokes", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("return 200 status", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" })
      .then(res => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "skyes", password: "pie" })
          .then(response => {
            return ask(server)
              .get("/api/jokes")
              .set("authorization", response.body.token)
              .then(jokes => {
                expect(jokes.status).toBe(200);

                // expect(jokes.type).toMatch(/json/);
              });
          });
      });
  });

  it("returns json", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" })
      .then(res => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "skyes", password: "pie" })
          .then(response => {
            return ask(server)
              .get("/api/jokes")
              .set("authorization", response.body.token)
              .then(jokes => {
                expect(jokes.type).toMatch(/json/);
              });
          });
      });
  });
});
