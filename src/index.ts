import express from "express";
import customerRoute from "./routes/customers";

const app = express();
app.use(express.json());

app.use("/api/v1", customerRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
