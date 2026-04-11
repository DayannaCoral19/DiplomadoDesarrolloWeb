// TODOS LOS EJERCICIOS JUNTOS

console.log("---------- EJERCICIO 1 ----------\n");

const nombre = "Ana";
let edad = 25;
let ciudad = "Bogotá";

console.log("PRIMER MENSAJE:");
console.log("Hola, me llamo " + nombre + ", tengo " + edad + " años y vivo en " + ciudad);

ciudad = "Medellín";

console.log("\nSEGUNDO MENSAJE:");
console.log("Hola, me llamo " + nombre + ", tengo " + edad + " años y vivo en " + ciudad);

console.log("\n---------- EJERCICIO 2 ----------\n");

const PRECIO_PRODUCTO = 100;
const tasaIVA = 0.21;

let iva = PRECIO_PRODUCTO * tasaIVA;
let precioFinal = PRECIO_PRODUCTO + iva;

console.log("Precio original: $" + PRECIO_PRODUCTO);
console.log("IVA (21%): $" + iva);
console.log("Precio final: $" + precioFinal);

console.log("\n---------- EJERCICIO 3 ----------\n");

let vidas = 3;

console.log("Vidas restantes: " + vidas);

vidas = vidas - 1;

console.log("Vidas restantes: " + vidas);

console.log("\n---------- FIN ----------");