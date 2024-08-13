import express from "express";
import customerRoute from "./routes/customers";
const path = require("path");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/api/v1", customerRoute);

app.get("/", (req, res) => {
  res.render("pages/signIn");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
