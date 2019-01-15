const express = require('express');
const app = express();
const hbs = require('hbs')

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');
require('./helpers');

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {


    res.render('home', {
        nombre: "Antonio",
        anio: new Date().getFullYear(),

    });

});
app.get('/ayuda', (req, res) => {


    res.render('ayuda', {
        nombre: "Antonio",
        anio: new Date().getFullYear(),

    });

});
app.listen((PORT), () => {
    console.log("Escuchando peticiones");
});