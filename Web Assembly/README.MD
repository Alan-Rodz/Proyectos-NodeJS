Breve introducción a conceptos básicos de WebAssembly.

En este ejemplo compilamos test.c a test.wasm usando esta herramienta: https://mbebenita.github.io/WasmExplorer/

Luego a través de index.html le hablamos a main.js que a su vez le habla a test.wasm

Lo que hace el main.js es ejecutar Fibonacci hasta el numero 45 y poner en consola el tiempo que se tardó en hacerlo.

Esto se hizo siguiendo este artículo: https://medium.com/jspoint/the-anatomy-of-webassembly-writing-your-first-webassembly-module-using-c-c-d9ee18f7ac9b


En el artículo se puede ver cómo la ejecución con WebAssembly del programa en cuestión toma ~6 segundos, mientras que cuando se hace con JS tradicional toma ~16 segundos
