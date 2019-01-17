//Verificar Token

const jwt = require('jsonwebtoken');
let verificaToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
};
//VERIFICA EL ADMIN_USER
let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario;
    let role = usuario.role;
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Administrador no valido'
            }
        });
    }
    res.json({
        nombre: usuario.nombre,
        email: usuario.email
    })
    next();
}

module.exports = {
    verificaToken,
    verificaAdmin
}