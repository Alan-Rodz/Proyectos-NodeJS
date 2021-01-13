//Estamos calculando el numero 45 de la serie de fibonacci con WebAssembly
//A WA le toma 6 segundos, mientras que con JS normal tomaría 16

fetch('/test.wasm').then(response => {

    //Convert stream to array buffer
    return response.arrayBuffer();

}).then((wasmBuffer) => {

    //Compile and instantiate WASM module
    return WebAssembly.instantiate(wasmBuffer);

}).then(({instance, module }) => {

    console.time('fib-wasm');
    console.log('fib(45): ', instance.exports.fib(45));
    console.timeEnd('fib-wasm');

});     