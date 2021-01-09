//Si no les ponemos modificador de acceso son public x default 
/*
class Persona {
    public nombre: string,
    readonly edad: number,
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
}
*/

//Lo de arriba puede convertirse en esto que es equivalente
class Persona {
    constructor(
        public nombre: string,
        public readonly edad: number,
    ) { }
}

//Herencia
class Estudiante extends Persona {
    constructor(nombre: string, edad: number) {
        super(nombre, edad);
    }
}