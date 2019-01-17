const express = require('express');
require('./config/config')
const app = express();
const mongoose = require('mongoose');
const path = require('path')


const bodyparsen = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyparsen.urlencoded({ extended: false }))
    //parse application/json
app.use(bodyparsen.json())
    //habilitar el public
app.use(express.static(path.resolve(__dirname, '../public')))
    //Configuracion global de rutas
app.use(require('./routes/index'));
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000");
});
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log("Base de Datos en linea");
})