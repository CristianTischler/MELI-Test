const express = require("express");
const cors = require("cors");
const routes = require("./routes/api");
const compression = require("compression");

const app = express();
const PORT = 3001;

app.use(compression());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
