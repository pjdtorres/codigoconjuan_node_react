const Produtos = require("../models/Produtos");
let fs = require("fs");

const multer = require("multer");
const shortid = require("shortid");

const nanoid = require("nanoid");

const configuracaoMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      //   console.log("configuracaoMulter: ", file.originalname);

      const extension = file.mimetype.split("/")[1];

      const codigo_nanoid = nanoid(10);
      //   cb(null, `${shortid.generate()}.${extension}`);
      cb(null, `${codigo_nanoid}.${extension}`);
      //   cb(null, `${file.originalname}`);
      //   console.log("configuracaoMulter: ", codigo_nanoid);
    }
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato Não Válido"));
    }
  }
};

// passar a configuração e o campo
const upload = multer(configuracaoMulter).single("imagem");

// Upload ficheiros
exports.uploadFicheiro = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      res.json({ msg: "erro upload Ficheiro" });
    }
    return next();
  });
};

// Acrescentar novos produtos
exports.novoProduto = async (req, res, next) => {
  const produto = new Produtos(req.body);
  console.log(produto);
  try {
    if (req.file.filename) {
      produto.imagem = req.file.filename;
    }

    // armazenar no registo
    await produto.save();
    res.json({ msg: "Foi acrescentado um novo produto!" });

    console.log("Foi acrescentado um novo produto!");
  } catch (error) {
    // Se existe erro, console.log e next
    console.log("novoProduto: Temos erros");
    // console.log(error)

    next();
  }
};

// Mostra todos os Produtos
exports.mostrarProdutos = async (req, res, next) => {
  try {
    // obter todos os produtos
    const produtos = await Produtos.find({});
    // console.log("Foram mostrados todos os produtos!");
    res.json(produtos);
  } catch (error) {
    // Se existe erro, console.log e next
    console.log("mostrarProdutos: Temos erros");
    console.log(error);

    next();
  }
};

// Mostra um Produto em especifico por ID
exports.mostrarProduto = async (req, res, next) => {
  try {
    // obter todos os produtos
    const produto = await Produtos.findById(req.params.idProduto);
    console.log("Foi mostrado o produto: ", req.params.idProduto);
    if (!produto) {
      res.json({ msg: "Este produto não existe!!!" });
      return next();
    }
    // Mostrar o producto
    res.json(produto);
  } catch (error) {
    // Se existe erro, console.log e next
    res.json({ msg: "Este Produto não existe" });
    // console.log(error);

    next();
  }
};

// Atualizar produto via id
exports.atualizarProduto = async (req, res, next) => {
  try {
    // construir um novo produto
    let novoProduto = req.body;

    const produtoAnterior = await Produtos.findById(req.params.idProduto);
    // const myPath = __dirname + `/../uploads/${lerProduto.imagem}`;
    // console.log(myPath);

    // fs.unlink(myPath, (error) => {
    //   if (error) {
    //     console.log("Não foi excluido qualquer ficheiro!!");
    //     //   console.log(error);
    //   }
    //   return;
    // });

    // verificar se existe imagem nova
    if (req.file) {
      novoProduto.imagem = req.file.filename;
      console.log("Imagem foi alterada!!!");
    } else {
      let novoProduto = await Produtos.findById(req.params.idProduto);
      novoProduto.imagem = produtoAnterior.imagem;
      console.log("Imagem anterior mantem-se!!!");
    }

    let produto = await Produtos.findOneAndUpdate(
      { _id: req.params.idProduto },
      novoProduto,
      {
        new: true
      }
    );

    res.json(produto);
  } catch (error) {
    console.log("atualizarProduto: Este Produto não existe");
    res.json("atualizarProduto: Este Produto não existe");
    // console.log(error);
    next();
  }
};

exports.eliminarProduto = async (req, res, next) => {
  try {
    const lerProduto = await Produtos.findById(req.params.idProduto);
    // const myPath = __dirname + `/../uploads/${lerProduto.imagem}`;
    // // console.log(myPath);
    // fs.unlink(myPath, (error) => {
    //   if (error) {
    //     console.log("Não foi excluido qualquer ficheiro!!");
    //     //   console.log(error);
    //   }
    //   return;
    // });

    await Produtos.findByIdAndDelete({ _id: req.params.idProduto });
    console.log("Produto Eliminado: ", req.params.idProduto);
    res.json({ lerProduto, msg: "Produto Eliminado" });
  } catch (error) {
    res.json({ msg: "Não existe este Produto" });
    console.log("Não existe este Produto");
    // console.log(error);
    next();
  }
};

exports.buscarProduto = async (req, res, next) => {
  try {
    // Obter query
    const { query } = req.params;
    const produto = await Produtos.find({ nome: new RegExp(query, "i") });
    console.log("buscarProduto existe: ", produto[0].nome);
    res.json(produto);
  } catch (error) {
    console.log("error: Este produto não existe!!");
    res.json(error);
    next();
  }
};
