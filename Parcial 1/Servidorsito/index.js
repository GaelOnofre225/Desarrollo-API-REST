const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');     
const Router = require('./Router.js');

const app = express();

app.use(cors());          
app.use(morgan('dev'));   

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[Middleware de Aplicación] Petición entrante: ${req.method} a ${req.url} - Fecha: ${new Date().toLocaleTimeString()}`);
  next(); 
});

app.use('/monstruos', Router.router);

app.listen(8082, function(err) {
  if (err) console.log(err);
  console.log("Servidor escuchando en puerto 8082");
});

//El servidor debe de poder recibir archivos como jpg
//Separar por carpetas los archivos