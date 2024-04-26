const mongoose = require("mongoose");
mongoose.Promise = global.promise;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("\n********************************".green);
    console.log("✔ Mongo Successfully Connected! ".green);
    console.log("********************************".green);
    console.log(`URI: ${process.env.DATABASE}.\n`.green);
  })
  .catch((error) => {
    console.log("*********************************".red);
    console.log("    Mongo Connection Failed    ".red);
    console.log(error + "".red);
    console.log("*********************************\n".red);
  });

mongoose.connection.on("error", (error) => {
  console.log(error);
});
