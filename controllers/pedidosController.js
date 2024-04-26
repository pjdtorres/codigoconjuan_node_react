const Pedidos = require("../models/Pedidos");

exports.novoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ msg: "Juntou-se um novo pedido" });
  } catch (error) {
    console.log("novoPedido: Temos erros");
    // console.log(error)
    next();
  }
};

// Mostra todos os pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.produto",
      model: "Produtos"
    });

    console.log(pedidos);
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra um pedido através do seu ID
exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate("cliente")
    .populate({
      path: "pedido.produto",
      model: "Produtos"
    });

  if (!pedido) {
    res.json({ msg: "Este pedido não existe" });
    return next();
  }

  // mostrar o pedido
  res.json(pedido);
};

// Atualizar o pedido através do seu ID
exports.atualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.produto",
        model: "Produtos"
      });

    res.json(pedido);
  } catch (error) {
    // console.log(error);
    console.log("erro: atualizar pedido!");
    next();
  }
};

// eliminar um pedido através do seu ID
exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });

    console.log(`O pedido ${req.params.idPedido} foi eliminado`);
    res.json({ msg: "O pedido foi eliminado" });
  } catch (error) {
    // console.log(error);
    console.log("ERRO: pedido a eliminar não existe!");
    res.json({ ERRO: "O pedido a eliminar não existe!" });
    next();
  }
};
