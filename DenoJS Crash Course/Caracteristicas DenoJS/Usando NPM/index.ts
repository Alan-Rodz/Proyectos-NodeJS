//Nos permite usar la funcion require
import { createRequire } from "https://deno.land/std@0.83.0/node/module.ts";
const require = createRequire(import.meta.url);

//Para ejecutar tenemos que hacer deno run --allow-read --allow-env --unstable index.ts
const moment = require('moment');
console.log(moment().format('Do MMMM YYYY'));

const _ = require('lodash');
console.log(_.defaults({a:1}, {a:3, b:2})); 