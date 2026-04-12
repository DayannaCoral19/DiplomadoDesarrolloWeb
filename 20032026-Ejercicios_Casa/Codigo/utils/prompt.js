//  Importa el módulo 'readline' de Node.js para leer entrada del usuario
const readline = require('readline');

//  Crea una interfaz para leer de la terminal (teclado) y escribir en pantalla
const rl = readline.createInterface({
    input: process.stdin,   // Entrada: teclado
    output: process.stdout  // Salida: pantalla
});

//Define una función asíncrona llamada 'prompt' que recibe una pregunta como parámetro
function prompt(question) {
    //  Retorna una Promesa (permite usar await para esperar la respuesta)
    return new Promise((resolve) => {
        //  Usa rl.question() para mostrar la pregunta y esperar respuesta del usuario
        rl.question(question, (answer) => {
            //  Resuelve la Promesa con la respuesta del usuario
            resolve(answer);
        });
    });
}

// Exporta las funciones/variables para que otros archivos las puedan usar
module.exports = { prompt, rl };