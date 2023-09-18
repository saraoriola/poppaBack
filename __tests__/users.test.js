const request = require("supertest");
const app = require("../index");
const { User } = require("../models/index.js");

describe("testing/users", () => {
  const user = {
    name: "Test",
    password: "test",
    email: "test@test.es",
  };

  let token;

  afterAll(() => {
    return User.destroy({ where: { email: "test@test.es" }, truncate: true });
  });

  test("Register", async () => {
    const res = await request(app)
      .post("/users/register")
      .send(user)
      .expect(201);

    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.email).toBeDefined();
    expect(res.body.user.password).toBeDefined();
  });

  test("Login", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: user.email, password: user.password })
      .expect(200);
      
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("Logout a user record", async () => {
    const res = await request(app)
      .delete("/users/logout")
      .set({ Authorization: token })
      .expect(200);
    expect(token).toBe(null);
  });
});
