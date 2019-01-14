let deadpool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "regenacion",
    getNombre() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
};

let {
    nombre: primerNombre //se cambio el nombre a primerNombre
        ,
    apellido,
    poder
} = deadpool; //se utilizaron los objetos de deadpool
console.log(primerNombre, apellido, poder);