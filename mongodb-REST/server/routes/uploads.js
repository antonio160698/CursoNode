const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
let Usuario = require('../models/usuario');
let Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');
//default options
app.use(fileupload());
app.put('/upload/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No hay archivos'
                }
            })
    }
    //valida tipos 
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La tipos permitidas son ' + tiposValidos.join(','),
            }
        })
    }

    let archivo = req.files.archivo; //la key tiene que tener el mismo nombre que ponemos esn req
    let nombre = archivo.name.split('.');
    let extension = nombre[nombre.length - 1];
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'las extensiones permitidas son: ' + extensionesValidas.join(',')
            }
        })
    }
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            console.log("Aqui3");
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (tipo === 'usuario') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }

    })
})

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            borrarArchivo(nombreArchivo, 'usuarios');
            console.log("Aqui2");
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no se encuentra el usuario'
                }
            })

        }
        borrarArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })
    })
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        //borrarArchivo(nombreArchivo, 'productos');
        if (err) {
            console.log("Falla");
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            borrarArchivo(nombreArchivo, 'productos');
            console.log("Aqui1");
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no se encuentra el usuario'
                }
            })


        }
        borrarArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            })
        })
    })
}

function borrarArchivo(nombreImagen, tipo) { //hacer que no se repita el mismo archivo en la BD
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    console.log(pathImagen);
    if (fs.existsSync(pathImagen)) { //si existe la direccion
        fs.unlinkSync(pathImagen); //la borra
    }

}
module.exports = app;