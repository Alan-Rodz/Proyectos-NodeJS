//Importamos WorkBox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
    //Ruta que matchea todos las imagenes de nuestro proyecto
    ({request}) => request.destination === 'image',

    //Estrategia para cómo vamos a hacer el caching
    //Esta significa que la PWA buscará en el caché antes de ir online de ser posible
    //Si quisieramos que hiciera lo contrario (online antes que caché) usariamos .NetworkFirst()
    new workbox.strategies.CacheFirst()
);