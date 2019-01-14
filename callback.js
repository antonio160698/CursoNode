/*setTimeout(function() {
    console.log("Hola"); //la funcion es el callback
}, 3000);*/
let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: "Antonio",
        id
    }
    if (id === 20) {
        callback(`El usuario con id ${id}, no existe en la BD`);
    } else {
        callback(null, usuario);
    }
}
getUsuarioById(20, (err, usuario) => {
    if (err) {
        return console.log(err);
    }
    console.log('Usuario de base de datos', usuario);
});