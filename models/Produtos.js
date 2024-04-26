const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produtosSchema = new Schema(
  {
    nome: {
      type: String,
      trim: true
    },
    preco: {
      type: Number
    },
    imagem: {
      type: String
    }
  },
  {
    // versionKey: "_version",
    versionKey: false
  }
);

module.exports = mongoose.model("Produtos", produtosSchema);
