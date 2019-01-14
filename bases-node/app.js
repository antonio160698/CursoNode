const argv = require('yargs').command('listar', 'Imprime en consola la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    }).command('crear', ' crea una la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    })
    .help().argv;
// const fs = require('express');//libreria que no esta en node
// const fs = require('./fs');//libreria que tenemos en los archivos de nuestro proyecto
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar'); //destructuracion

let base = argv.base;
let limite = argv.limite;
let comando = argv._[0];
switch (comando) {
    case 'listar':
        listarTabla(base, limite)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        break;
    case 'crear':
        crearArchivo(base, limite)
            .then(archivo => console.log(`Archivo creado: ${archivo}`))
            .catch(err => console.log(err));
        break;

    default:
        console.log('comando no reconocido')
        break;
}