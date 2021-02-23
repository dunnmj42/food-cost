const app = require("../server");
const testServer = require("supertest");

describe("Testing user routes", () => {

  test("Logout route should always respond with status 200", async () => {
    const response = await testServer(app).post("/api/user/logout");
    expect(response.statusCode).toBe(200);
  })

  test("User route should be protected - must be logged in", async () => {
    const response = await testServer(app).get("/api/user/");
    expect(response.statusCode).toBe(403);
  })

})