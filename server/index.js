require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/User/users");
const authRoutes = require("./routes/User/auth");
const passwordResetRoutes = require("./routes/User/passwordReset")
const shelterUser = require("./routes/Shelter/users")
const shelterAuth = require("./routes/Shelter/auth")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);


app.use("/api/shelterUser", shelterUser)
app.use("/api/shelterauth", shelterAuth)


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
