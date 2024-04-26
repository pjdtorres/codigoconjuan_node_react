// ################# Base de dados ###################
const colors = require("colors");
require("dotenv").config({ path: "variables.env" });

// ################# conectar a mongo ###################
require("./config/db");

// ################# requires ###################
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");

// Criar o servidor
const app = express();

// Cors permite que un cliente se
// conecta a otro servidor para el intercambio
// de recursos
const cors = require("cors");

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir um dominio para receber petições
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("origin: ", origin);
    // Rever se a petição vem de um servidor que está em whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido por CORS"));
    }
  }
};

// Habilitar cors
app.use(cors(corsOptions));

// Rotas da app
app.use("/", routes());

// Pasta publica
app.use(express.static("uploads"));

// ################# listener ###################
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, (req, res) => {
  console.log("\n*******************************".blue);
  console.log(`✔ Server está a funcionar no port ${port}!`.blue);
  console.log("*******************************".blue);
  // console.log(`Server started on PORT: ${port}.`);
});
