//Este es el código en C que compilamos a test.wasm
long long fib(int n)
{
    if(n <= 1) return 1;
    return fib(n-1) + fib(n-2);
}