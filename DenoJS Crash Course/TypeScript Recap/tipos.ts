//Tipos explicitos
let edad: number;
edad = 15;

//Funciones
function suma(a: number, b: number){
    return a+b;
}
console.log(suma(1,2));

let n: null;
let u: undefined;

function f(num:number){
    if(num%2 == 0){
        return 'par';
    } else {
        return 'impar';
    }
}

const valor = f(4)!;
valor.substr(1);


//Void
function hola(nombre: string){
    console.log(`Hola desde: ${nombre}`);
}

hola("consola");

//Arreglos
let frutas = ["naranja", "manzana", "banana"];

