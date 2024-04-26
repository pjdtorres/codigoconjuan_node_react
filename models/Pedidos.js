const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidosSchema = new Schema(
  {
    cliente: {
      type: Schema.ObjectId,
      ref: "Clientes"
    },
    pedido: [
      {
        produto: {
          type: Schema.ObjectId,
          ref: "Produtos"
        },
        qty: Number
      }
    ],
    total: {
      type: Number
    }
  },
  {
    // versionKey: "_version",
    versionKey: false
  }
);

module.exports = mongoose.model("Pedidos", pedidosSchema);
