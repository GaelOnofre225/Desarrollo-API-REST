const express = require('express');
const Router = require('./Router.js');

const app = express();

app.use(express.json());

const registrarPeticion = (req, res, next) => {
  console.log(`[LOG] Petición recibida -> Método: ${req.method} | Ruta: ${req.url}`);
  next();
};

app.use(registrarPeticion);

app.use('/monstruos', Router.router);

app.listen(8082, function(err) {
  if (err) console.log(err);
  console.log("Servidor escuchando en puerto 8082");
});