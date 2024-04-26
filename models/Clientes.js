const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const shortid = require("shortid");
// const nanoid = require("nanoid");

const clientesSchema = new Schema(
  {
    // _id: shortid.generate(),
    nome: {
      type: String,
      trim: true
    },
    apelido: {
      type: String,
      trim: true
    },
    empresa: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      index: {
        unique: true
      },
      lowercase: true,
      trim: true
    },
    telefone: {
      type: String,
      trim: true
    }
  },
  {
    // versionKey: "_version",
    versionKey: false
  }
);

module.exports = mongoose.model("Clientes", clientesSchema);
