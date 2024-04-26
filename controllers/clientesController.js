const Clientes = require("../models/Clientes");

// Juntar um novo cliente
exports.novoCliente = async (req, res, next) => {
  // console.log(req.body);

  const cliente = new Clientes(req.body);

  try {
    // Armazenar o registo
    await cliente.save();
    res.json({ msg: "Foi acrescentado um novo cliente" });
  } catch (error) {
    // se existe erro, console.log e next()
    console.log(error);
    res.send(error);
    next();
  }
};

// Mostra todos os Clientes
exports.mostrarClientes = async (req, res, next) => {
  // console.log("req: ", req);
  try {
    // Mostrar o registo
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    // Se existe erro, console.log e next()
    console.log("Este cliente está em mostrarClientes");
    res.json({ msg: "Este cliente está em mostrarClientes" });
    next();
  }
};

// Mostrar um cliente especifico (ID)
exports.mostrarCliente = async (req, res, next) => {
  try {
    // Mostrar o registo
    const cliente = await Clientes.findById(req.params.idCliente);
    res.json(cliente);
  } catch (error) {
    // Se existe erro, console.log e next()
    // console.log(error);
    res.json({ msg: "Este cliente não existe!" });
    console.log("mostrarCliente: Temos erros");
    next();
  }
};

// Atualizar um cliente pelo seu ID
exports.atualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true
      }
    );
    res.json(cliente);
    console.log("Foi atualizado um cliente!");
  } catch (error) {
    // Se existe erro, console.log
    // res.json({ msg: "Este cliente não existe!" });
    console.log("atualizarCliente: Temos erros");
    // console.log(error);
    res.send(error);
    next();
  }
};

// Eliminar um cliente pelo seu ID
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ msg: "Este cliente foi eliminado!" });
    console.log("Foi eliminado um cliente!");
  } catch (error) {
    // Se existe erro, console.log
    console.log("eliminarCliente: Temos erros");
    // console.log(error);
    next();
  }
};
