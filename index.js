const express = require("express");
const errorHandler = require("./middleware/newHandler.js");
const { connect } = require("mongoose");
const connectDB = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();
const app = express();
const PORT = 5000 || process.env.PORT;
connectDB();
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoute.js"));
app.use("/api/users", require("./routes/userRoute.js"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
