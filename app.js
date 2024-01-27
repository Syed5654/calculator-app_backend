const express = require("express");
const { sequelize } = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
};

app.use(cors(corsOptions));
app.use("/api", routes);

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
