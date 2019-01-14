/*function sumar(a,b){
    return a+b;
}*/
//console.log(sumar(10,20));

/*let sumar = (a, b) => a + b;
console.log(sumar(10, 20));*/

/*function saludar() {
    return "Hola mundo";
}*/
//let saludar = () => "Hola mundo";
let saludar = nombre => `Hola ${nombre}`;
let deadpool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "regenacion",
    getNombre() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    },
    getNombreFlecha: () => {
            return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
        } //this no se utiliza cuando se crea una funcion de flecha ya que no utiliza los valores dentro de
        //deadpool si no que utiliza los valores de afuera de la funcion de flecha

};
console.log(deadpool.getNombre());