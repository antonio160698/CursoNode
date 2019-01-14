const fs = require('fs');

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        let data = '';
        if (!Number(base) && !Number(limite)) {
            reject(`No es un numero`);
            return;
        }
        for (let i = 0; i <= limite; i++) {
            data += `${base} * ${i} = ${base*i}\n`;
        }

        fs.writeFile(`tablas/tabla_${base}.txt`, data, (err) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(`tabla_${base}.txt`);
            }
        });
    });
}
let listarTabla = (base, limite) => {
    return new Promise((resolve, reject) => {
        let dato = '';
        if (!Number(base) && !Number(limite)) {
            reject(`No es un numero`);
            return;
        }
        for (let i = 0; i <= limite; i++) {
            dato += `${base} * ${i} = ${base*i}\n`;
        }
        resolve(dato);
    })
};

module.exports = {
    crearArchivo,
    listarTabla
}