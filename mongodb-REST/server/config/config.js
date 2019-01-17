//Puerto

process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}
// } else {
//     urlDB = 'mongodb://cafeUser:hola1234@ds159184.mlab.com:59184/cafe';
// }
process.env.URLDB = urlDB;

//Vencimiento el Token
// 60 segundos
// 60 Minutos 
// 24 horas 
// 30 dias 

process.env.CADUCIDAD_TOKEN = '48h';

// seed de aunteticacion

process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo"