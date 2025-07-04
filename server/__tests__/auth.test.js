const request = require("supertest");
const app = require("../index"); // 🔁 or server.js if you export the app
const mongoose = require("mongoose");
const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");

// Connect DB before tests
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/testdb");
});

// Cleanup after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close DB after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// ✅ TEST: Login
describe("POST /api/auth", () => {
  it("should login successfully with correct credentials", async () => {
    // 1. Create a user manually
    const hashedPassword = await bcrypt.hash("Test@123", 10);
    const user = new User({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: hashedPassword,
    });
    await user.save();

    // 2. Try to login
    const res = await request(app).post("/api/auth").send({
      email: "test@example.com",
      password: "Test@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined(); // Token should be returned
    expect(res.body.message).toBe("User login successfully");
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(app).post("/api/auth").send({
      email: "wrong@example.com",
      password: "invalidpass",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });
});
