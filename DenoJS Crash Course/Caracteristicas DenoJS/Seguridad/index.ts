//Leemos el directorio actual (para leer tenemos que hacer deno run --allow-read nombrearchivo)
console.log(Deno.cwd());

//Leemos contenidos de archivos y outputs (tambien necesita --allow-read)
//const contenido = await Deno.readTextFile('./leer.txt');
//Tambien podemos hacer
const contenido = Deno.readTextFileSync("./leer.txt");
console.log(contenido);

//Escribimos hacia un archivo --allow-write
//x tanto tendríamos que hacer --allow-read --allow-write para que todo este archivo funcione hasta aqui
Deno.writeTextFile("./escribir.txt", "123");

//Acceso a variables del entorno --allow-env
Deno.env.get("TEST");

//Acceso a la red --allow-netf
const json = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
  (respuesta) => respuesta.json(),
);

//X tanto tendría que ser --allow-read -allow-write --allow-env --allow-net

//Si queremos decir 'el unico dominio al que te estoy dando accesso es x' hacemos:
//deno run --allow-net=jsonplaceholder.typicode.com index.ts
