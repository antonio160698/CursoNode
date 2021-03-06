const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middelwares/autenticacion')
const { verificaAdmin } = require('../middelwares/autenticacion')

app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = Number(req.query.limite || 5);
    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count((err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            })
        })
});
app.post('/usuario', [verificaToken, verificaAdmin], (req, res) => {
    let body = req.body;;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es neseario'

    //     });
    // } else {
    //     res.json({
    //         body
    //     });
    // }
});
app.put('/usuario/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});
app.delete('/usuario/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});
module.exports = app;