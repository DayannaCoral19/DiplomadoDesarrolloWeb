// CALCULADORA BÁSICA 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise((resolve) => {
        readline.question(pregunta, resolve);
    });
}

async function ejecutarEjercicio() {
    console.log("\n=== CALCULADORA BÁSICA ===\n");
    
    // Pedir primer número
    let num1Texto = await preguntar("Ingresa el primer número: ");
    if (num1Texto === "" || isNaN(num1Texto)) {
        console.log("\n❌ Primer número inválido.");
        readline.close();
        return;
    }
    let num1 = parseFloat(num1Texto);
    
    // Pedir segundo número
    let num2Texto = await preguntar("Ingresa el segundo número: ");
    if (num2Texto === "" || isNaN(num2Texto)) {
        console.log("\n❌ Segundo número inválido.");
        readline.close();
        return;
    }
    let num2 = parseFloat(num2Texto);
    
    // Pedir operación
    console.log("\nOperaciones disponibles: suma, resta, mult, div");
    let operacion = await preguntar("¿Qué operación deseas? ");
    
    let resultado;
    
    switch (operacion.toLowerCase()) {
        case "suma":
            resultado = num1 + num2;
            console.log(`\n${num1} + ${num2} = ${resultado}`);
            break;
        case "resta":
            resultado = num1 - num2;
            console.log(`\n${num1} - ${num2} = ${resultado}`);
            break;
        case "mult":
            resultado = num1 * num2;
            console.log(`\n${num1} × ${num2} = ${resultado}`);
            break;
        case "div":
            if (num2 === 0) {
                console.log("\n❌ Error: No se puede dividir entre cero.");
                readline.close();
                return;
            }
            resultado = num1 / num2;
            console.log(`\n${num1} ÷ ${num2} = ${resultado}`);
            break;
        default:
            console.log("\n❌ Operación no válida.");
    }
    
    readline.close();
}

ejecutarEjercicio();