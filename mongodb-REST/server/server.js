const express = require('express');
require('./config/config')
const app = express();
const mongoose = require('mongoose');


const bodyparsen = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyparsen.urlencoded({ extended: false }))
    //parse application/json
app.use(bodyparsen.json())

app.use(require('./routes/usuario'));
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000");
});
console.log(process.env.URLDB)
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log("Base de Datos en linea");
})