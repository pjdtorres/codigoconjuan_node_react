const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuarios = require("../models/Usuarios");
require("dotenv").config({ path: "variables.env" });

// Registar Utilizador
exports.registarUsuario = async (req, res) => {
  // Ler dados do usuario e  colocar no modelo Usuarios
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ msg: "Usuario criado corretamente!!!" });
  } catch (error) {
    console.log("error registarUsuario");
    res.json({ msg: "Existem erros em registarUsuario" });
  }
};

// Autenticar Utilizador
exports.autenticarUsuario = async (req, res, next) => {
  // Procurar Usuario
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email: email });

  if (!usuario) {
    // Se usuario não existe
    await res.status(401).json({ msg: "Este usuario não existe!!!" });
    next();
  } else {
    // Se usuario existe, verificar password
    if (!bcrypt.compareSync(password, usuario.password)) {
      // Se password está incorreta
      await res.status(401).json({ msg: "Password Incorreta!!!" });
      next();
    } else {
      // password correta, firmar token
      const token = jwt.sign(
        {
          email: usuario.email,
          nome: usuario.nome,
          id: usuario._id
        },
        process.env.KEY,
        {
          expiresIn: "10h"
        }
      );

      // Retornar o TOKEN
      res.json({ token });
    }
  }
};
