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

let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if (!empleadoDB) {
        callback(`No existe un empleado con el id ${id}`)
    } else {
        callback(null, empleadoDB)
    }
}
let getSalario = (nombre, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.nombre === nombre)
    if (!empleadoDB) {
        callback(`No existe un salario para el usuario ${nombre}`);
    } else {
        let salarioDB = salarios.find(salario => salario.id === empleadoDB.id)
        if (!salarioDB) {
            callback(`No existe un salario para el fusuario ${nombre}`);
        } else {
            let datos = empleadoDB.nombre + " " + salarioDB.salario;
            callback(null, datos);
        }
    }
}
let getSalarioVideo = (empleado, callback) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    if (!salarioDB) {
        callback(`No se encontro un salario para el usuario ${empleado.nombre}`);
    } else {
        callback({
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        });
    }
}

getEmpleado(1, (err, empleado) => {
    if (err) {
        return console.log(err);
    }
    console.log(`El empleado con es ,`, empleado);
});
getSalario("Fernando", (err, salario) => {
    if (err) {
        return console.log(err);
    }
    console.log(`El empleado es, `, salario);
});
getEmpleado(3, (err, empleado) => {
    if (err) {
        return console.log(err);
    }
    getSalarioVideo(empleado, (err, respuesta) => {
        if (err) {
            return console.log(err);
        }
        console.log(` El salario de, ${respuesta.nombre} es de ${respuesta.salario}`);
    })
});