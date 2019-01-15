const yargs = require('./config/yargs');
const argv = require('yargs').argv;
const dato = require('./por-hacer');
const colors = require('colors');
let comando = argv._[0];
switch (comando) {
    case 'crear':
        let tarea = dato.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = dato.getListado();
        for (let tarea of listado) {
            console.log('Por hacer'.green);
            console.log(tarea.descripcion);
            console.log("Estado: ", tarea.completado);
            console.log("=====================".green);
        }
        break;
    case 'actualizar':
        let actualizado = dato.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = dato.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log("No se reconoce el comando ");
        break;
}