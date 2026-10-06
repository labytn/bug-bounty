import test from "node:test";
import assert from "node:assert/strict";
import { registerUser } from "../services/authService.js";
import { verifyAccessToken } from "../utils/jwt.js";

test("registerUser uses identical user ID for return object and JWT sub claim", async () => {
  const payload = {
    email: "test@example.com",
    role: "client"
  };

  const result = await registerUser(payload);
  assert.ok(result.id, "User ID should be present");
  assert.ok(result.token, "Access token should be present");

  const decoded = verifyAccessToken(result.token);
  assert.equal(result.id, decoded.sub, "Returned user id and JWT sub claim must be identical");
  assert.equal(result.role, decoded.role, "Role must match payload");
});
