const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/UserRoute")
const TeacherRouter = require("./Routes/TeacherRoute")
const AssignmentRouter = require("./Routes/AssignmentRoute")
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log(`Error connecting to database : ${error}`);
  }
};
connectToDatabase();


app.use("/user",UserRouter)
app.use("/teacher",TeacherRouter);
app.use("/assignment",AssignmentRouter)

app.listen(3001, () => {
  console.log("Server Started");
});
