const express = require('express');
let app = express();

let { verificaToken } = require('../middelwares/autenticacion');
let Producto = require('../models/producto')
app.get('/productos', (req, res) => {
        //trae todos los productos
        //populate: usuario categoria
        //paginado
        Producto.find({})
            .soft()
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
    //obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    //populate: usuario categoria
    let id = req.param.id;
    Producto.findById(id)
        .soft()
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
app.post('/productos/:id', (req, res) => {
    //grabar el usuario
    //grabar una categoria de listado
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: req.categoria
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
        res.json({
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
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
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
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.nombre;
        productoDB.categoria = body.nombre;
        productoDB.categoria = body.categoria;
        productoDB.descripcion = body.descripcion;
        producto.save((err, productoGuardado) => {
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
    let descCategoria = {
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, disponible, { new: true, runValidators: true }, (err, productoDB) => {
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