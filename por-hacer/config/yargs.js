const argv = require('yargs');
const descripcion = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: "Descripcion de la tarea por hacer"
    }
}
const completado = {
    completado: {
        default: true,
        alias: 'c',
        desc: "Marca como completado o pendiente la tarea"
    }
}

argv.command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    }).command('borrar', 'Borra un elemento del las tareas', {
        descripcion
    }).help().argv;

module.exports = {
    argv
}