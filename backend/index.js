import express from "express";
import taskRouter from "./routes/task.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./utils/config.js";

connectDB();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/task", taskRouter);
app.use(errorHandler);
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome at the backend of this TODO app" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
