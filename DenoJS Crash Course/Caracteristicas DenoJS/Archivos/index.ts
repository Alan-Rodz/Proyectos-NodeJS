//Para usar esto tendríamos que hacer deno run --allow-read index.ts muestra.txt donde muestra.txt sería Deno.args[0]
//const path = Deno.args[0];
//console.log(path);
//const  contenido = await Deno.readTextFile(path);
//console.log(contenido);

//Podemos imprimir todos los archivos de un directorio iterando a través de ellos
//La syntax sería deno run --allow-read index.ts . donde "." es el nombre del directorio (cwd) pero tambien podria ser .. por ejemplo
/*
const dir = Deno.args[0];
console.log(dir);
const path2 = Deno.cwd()+`/${dir}`;
for await (const directorio of Deno.readDir(path2)){
    console.log(directorio.name);
};

//Función para ver si un archivo existe o no
async function existe(path: string){
    try {
        const status = await Deno.lstat(path);
        return true;
    } catch (error) {
        if(error instanceof Deno.errors.NotFound){
            return false;
        } else {
            throw error;
        }
    }
}

const existeArchivo = await existe('1.txt');
const existeArchivo2 = await existe('muestra.txt');
console.log(existeArchivo);
console.log(existeArchivo2);

*/


//Creando directorios (requiere --allow-write)
//await Deno.mkdir('prueba');

//Le cambiamos el nombre
//await Deno.rename('prueba', 'prueba2');

//Borramos el directorio
await Deno.remove('prueba2');