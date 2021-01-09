const mapa = new Map<number, string>();
mapa.set(1, 'a');


function obtenerPromesa<T>(valor: T):Promise<T>{
    return new Promise((resolve, reject) => setTimeout(() => resolve(valor), 1000))
}

const valor1 = await obtenerPromesa(1);
console.log(valor1);

const valor2 = await obtenerPromesa("hola");
console.log(valor2);