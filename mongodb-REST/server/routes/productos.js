const express = require('express');
let app = express();

const { verificaToken } = require('../middelwares/autenticacion');
let Producto = require('../models/producto')
app.get('/productos', (req, res) => {
        //trae todos los productos
        //populate: usuario categoria
        //paginado
        Producto.find({ disponible: true })
            .sort()
            .populate('usuario categoria')
            .exec((err, producto) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    producto
                })
            })
    })
    //buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
        let termino = req.params.termino;
        let regex = new RegExp(termino, 'i');
        Producto.find({ nombre: regex })
            .populate('categoria', 'nombre')
            .exec((err, productos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    productos
                })
            })
    })
    //obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    //populate: usuario categoria
    let id = req.param.id;
    Producto.findById(id)
        .sort()
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto
            })

        })
})
app.post('/productos/:id', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria de listado
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no existe el ID'
                }
            })
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    })
})
app.put('/productos/:id', (req, res) => {
    //grabar el usuario
    //grabar una categoria de listado
    let id = req.params.id;
    let body = req.body;
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no existe el ID'
                }
            })
        }
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;
        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                producto: productoGuardado
            })
        })
    })
})
app.delete('/productos/:id', (req, res) => {
    //disponible false 
    let id = req.params.id;
    let body = req.body;
    Producto.findById(id).exec((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no existe el ID'
                }
            })
        }
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'producto Borrado'
            });
        })

    })
})
module.exports = app;