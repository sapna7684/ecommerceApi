const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRute = require("./routes/auth")
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DataBase connection successful")).catch((error) => {console.log(error)})
app.use(express.json())
app.use("/api/auth", authRute);
app.use("/api/users", userRoute);
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
})