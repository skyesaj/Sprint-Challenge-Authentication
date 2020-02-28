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
      .send({ username: "skyes", password: "pie" });
    expect(user.body.username).toMatch(/skyes/);
  });
});

it("returns status 200", async () => {
  return ask(server)
    .post("/api/auth/register")
    .send({ username: "skyes", password: "pie" });
  expect(response.status).toBe(200);
});

describe("GET /jokes", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("return 200 status", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "pie" });
    expect(response.status).toBe(200);
  });
});
