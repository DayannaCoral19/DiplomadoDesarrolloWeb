// EJERCICIO 2: Calculadora de IVA
const PRECIO_PRODUCTO = 100;
const tasaIVA = 0.21;

let iva = PRECIO_PRODUCTO * tasaIVA;
let precioFinal = PRECIO_PRODUCTO + iva;

console.log("Precio original: $" + PRECIO_PRODUCTO);
console.log("IVA (21%): $" + iva);
console.log("Precio final: $" + precioFinal);