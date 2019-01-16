const express = require('express');
require('./config/config')
const app = express();

const bodyparsen = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyparsen.urlencoded({ extended: false }))
    //parse application/json
app.use(bodyparsen.json())
app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});
app.post('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es neseario'

        })
    } else {
        res.json({
            body
        });
    }
});
app.put('/usuario:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000");
});