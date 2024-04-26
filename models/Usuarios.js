const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true
    },
    lowercase: true,
    trim: true
  },
  nome: {
    type: String,
    required: "Coloca o teu nome"
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
