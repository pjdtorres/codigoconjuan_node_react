const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("authHeader: ", authHeader);

  if (!authHeader) {
    const error = new Error("Não está autenticado, não existe JWT!!!");
    error.statusCode = 401;
    throw error;
  }

  // console.log("authHeader: ", authHeader);

  const chaveSecreta = process.env.KEY;

  if (!chaveSecreta) {
    console.error("Chave secreta em falta...");
    error.statusCode = 500;
    throw error;
  }

  try {
    reverToken = jwt.verify(authHeader, chaveSecreta);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  // Se o Token for valido, mas existe um erro
  if (!reverToken) {
    const error = new Error("Não está autenticado");
    error.statusCode = 401;
    throw error;
  }

  next();
};

exports;
