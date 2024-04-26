const express = require("express");
const router = express.Router();

const clientesController = require("../controllers/clientesController");
const produtosController = require("../controllers/produtosController");

const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

// middleware para proteger as rotas
const auth = require("../middleware/auth");
console.log("auth: ", auth);

module.exports = function () {
  router.get("/", (req, res) => {
    res.send("inicio");
  });

  router.get("/nosotros", (req, res) => {
    res.send("nosotros");
  });

  // ############# clientes #################
  // Junta clientes via POST
  router.post("/clientes", clientesController.novoCliente);

  router.get("/clientes", clientesController.mostrarClientes);
  // router.get("/clientes", clientesController.mostrarClientes);

  // Mostra um cliente especifico
  router.get("/clientes/:idCliente", clientesController.mostrarCliente);

  // Atualizar cliente
  router.put("/clientes/:idCliente", clientesController.atualizarCliente);

  // Eliminar cliente
  router.delete("/clientes/:idCliente", clientesController.eliminarCliente);

  // ############# Produtos #################

  // Acrescentar novos produtos
  router.post(
    "/produtos",
    produtosController.uploadFicheiro,
    produtosController.novoProduto
  );

  // Mostra todos os produtos
  router.get("/produtos", produtosController.mostrarProdutos);

  // Mostrar un produto por su ID
  router.get("/produtos/:idProduto", produtosController.mostrarProduto);

  // Actualizar produtos
  router.put(
    "/produtos/:idProduto",
    auth,
    produtosController.uploadFicheiro,
    produtosController.atualizarProduto
  );

  // Eliminar produtos
  router.delete(
    "/produtos/:idProduto",
    auth,
    produtosController.eliminarProduto
  );

  // ====== BUSCA DE PEDIDOS ==========
  router.post("/produtos/busca/:query", produtosController.buscarProduto);

  // ====== PEDIDOS ==========
  // Juntar novos pedidos
  // router.post("/pedidos/novo/:id", pedidosController.novoPedido);
  router.post("/pedidos/novo/:idUsuario", pedidosController.novoPedido);

  // Mostrar todos os pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);

  // Mostrar um pedido
  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);

  // Atualizar um pedido
  router.put("/pedidos/:idPedido", pedidosController.atualizarPedido);

  // Eliminar um pedido
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);

  // ====== USUARIOS ==========
  router.post("/criar-conta", usuariosController.registarUsuario);
  router.post("/iniciar-sessao", usuariosController.autenticarUsuario);
  return router;
};
