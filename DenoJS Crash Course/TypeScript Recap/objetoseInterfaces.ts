//Objetos
//Tambien podemos usar el prefijo readonly para uno de los campos
let usuario: {
    nombre: string,
    edad: number
    [key:string] : any
};

usuario = {
    nombre: 'Alan',
    edad: 21,
    sobrenombre: '15'
}

//Interfaces
//Tambien podemos usar el prefijo readonly para uno de los campos
interface Persona{
    nombre: string,
    edad: number,
    [key: string]: any,
    hola(): string,
}

let usuario2: Persona = {
    nombre: 'Alan',
    edad: 21,
    sobrenombre: '222',
    hola(): string {
        return `${this.nombre} dice hola!`;
    }
}

