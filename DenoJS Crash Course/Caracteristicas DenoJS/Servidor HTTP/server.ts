//Estamos importando la funcion serve desde esta URL
import { serve } from "https://deno.land/std@0.83.0/http/server.ts";

//Dicha funcion toma como objeto un puerto
const servidor = serve({ port: 8000 });
console.log("Servidor activo en: http://localhost:8000/");

//Podemos especificar las URLs que queramos
for await (const req of servidor) {
    if(req.url === '/'){
        req.respond({body:"Hola mundo!\n"});
    } else if(req.url === '/acercade'){
        req.respond({body:"Informacion!"});
    }
}