//deno install --name deno_test index.js
//Nos genera archivos .cmd 
setTimeout(()=>{
    Deno.writeTextFile("./sample.txt", new Date().toString());
}, 5000);
