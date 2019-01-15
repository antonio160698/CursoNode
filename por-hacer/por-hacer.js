const fs = require('fs');

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile("./db/data.json", data, (err) => {
        if (err) throw new Error("No se encontro l archivo");
    });
}
const cargarDB = () => {
    try {
        listadoPorHacer = require("./db/data.json");
    } catch (err) {
        listadoPorHacer = [];
    }
}
let listadoPorHacer = [];
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
let getListado = () => {
    cargarDB();
    return listadoPorHacer;
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else { return false; }
}
const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.pop(index);
        guardarDB();
        return true;
    } else { return false; }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}