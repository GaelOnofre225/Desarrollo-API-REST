const express = require('express');
const recursoRouter = require('./routes/recursoRouter');

const app = express();

app.use(express.json());

app.use('/monstruos', recursoRouter.router);

app.listen(8082, function(err) {
  if (err) console.log(err);
  console.log("Servidor escuchando en puerto 8082");
});