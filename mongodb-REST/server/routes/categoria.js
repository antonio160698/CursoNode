const express = require('express');
let app = express();
let { verificaToken } = require('../middelwares/autenticacion');
let { verificaAdmin } = require('../middelwares/autenticacion');
let Categoria = require('../models/categoria');

//Mostrar todas las categorias
app.get('/categoria', (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                categorias: categoriaDB
            })
        })
});

//Mostrar Categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
        //Categoria.findById(...)
        let id = req.param.id;
        Categoria.findById(id, (err, categoriaDB) => {
            console.log(categoria)
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no es correcto'
                    }
                })
            }
            res.json({
                ok: true,
                categoria: categoriaDB
            })
        })
    })
    //Crear nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    //regresa una nueva categoria 
    //req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//Mostrar todas las categorias
app.put('/categoria/:id', (req, res) => {
        let id = req.params.id;
        let body = req.body;
        let descCategoria = {
            descripcion: body.descripcion
        }
        Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB
            });
        })
    })
    //Eliminar las categorias
app.delete('/categoria/:id', (req, res) => {
    //solo un administrador puede borrar categorias
    //Categoria.findByIDandRemove
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Categoria.findByIdAndRemove(id, [verificaToken, verificaAdmin], { new: true }, (err, categoriaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaBorrado
        })
    })
});

module.exports = app;