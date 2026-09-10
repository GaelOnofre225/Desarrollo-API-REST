const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');     
const path = require('path');
const Router = require('./routes/Router');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Vistas'));

app.use(cors());          
app.use(morgan('dev'));   
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[LOG] Petición entrante: ${req.method} a ${req.url} - Fecha: ${new Date().toLocaleTimeString()}`);
  next(); 
});

app.get('/ruta', (req, res, next) => {
  let opciones = {
    titulo: "Monster Hunter",
    subtitulo: "Monstruopedia"
  };
  res.render('plantilla', opciones);
});

app.use('/monstruos', Router.router);

app.listen(8082, function(err) {
  if (err) console.log(err);
  console.log("Servidor escuchando en puerto 8082");
});