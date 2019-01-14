// son como los callbacks
let empleados = [{
    id: 1,
    nombre: "Fernando"
}, {
    id: 2,
    nombre: "Melissa"
}, {
    id: 3,
    nombre: "Juan"
}];
let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];
let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id)
        if (!empleadoDB) {
            reject(`No existe un empleado con el id ${id}`)
        } else {
            resolve(empleadoDB)
        }
    });
}
let getSalarioVideo = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id);
        if (!salarioDB) {
            reject(`No se encontro un salario para el usuario ${empleado.nombre}`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }
    });
}
getEmpleado(3).then(empleado => {
    getSalarioVideo(empleado).then(respuesta => {
        console.log("Empleado de DB", respuesta);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});
console.log("Hola");
getEmpleado(3).then(empleado => {
    return getSalarioVideo(empleado);
}).then(resp => {
    console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
}).catch(err => {
    console.log(err);
});