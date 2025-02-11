const express = require("express");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const app = express();
const secret = "your-secret-key"; // You should store this securely

// Middleware to protect routes using JWT
const jsonwebtoken = expressJwt({ secret, algorithms: ["HS256"] });

app.use(express.json()); // Parse JSON bodies

// Route to login and issue a JWT token
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  //   In a real-world app, you'd validate the user against your database
  if (username == ' "user' && password === "password") {
    // Generate a JWT token
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Protected route, accessible only with a valid JWT (Bearer token)
app.get("/protected", jwtMiddleware, (req, res) => {
  res.send(
    "This is a protected route. You are authenticated with a Bearer token!"
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
