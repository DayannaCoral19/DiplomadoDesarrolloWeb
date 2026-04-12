// CONVERSOR DE MONEDA - Versión Terminal
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
    console.log("\n=== CONVERSOR DE MONEDA  ===\n");
    
    const TASA_EUROS = 0.92;
    const TASA_PESOS = 20.50;
    const TASA_SOLES = 3.78;
    
    let dolaresTexto = await preguntar("Ingresa la cantidad en DÓLARES (USD): ");
    
    if (dolaresTexto === "" || isNaN(dolaresTexto)) {
        console.log("\n❌ Cantidad inválida.");
        readline.close();
        return;
    }
    
    let dolares = parseFloat(dolaresTexto);
    
    console.log("\nMonedas disponibles:");
    console.log("Euros");
    console.log("Pesos");
    console.log("Soles");
    
    let moneda = await preguntar("\n¿A qué moneda quieres convertir? (escribe: euros, pesos, soles): ");
    
    let resultado = 0;
    let nombreMoneda = "";
    
    switch (moneda.toLowerCase()) {
        case "euros":
            resultado = dolares * TASA_EUROS;
            nombreMoneda = "Euros (€)";
            break;
        case "pesos":
            resultado = dolares * TASA_PESOS;
            nombreMoneda = "Pesos ($)";
            break;
        case "soles":
            resultado = dolares * TASA_SOLES;
            nombreMoneda = "Soles (S/)";
            break;
        default:
            console.log("\n❌ Moneda no válida.");
            readline.close();
            return;
    }
    
    resultado = Math.round(resultado * 100) / 100;
    console.log(`\n ${dolares} USD = ${resultado} ${nombreMoneda}`);
    
    readline.close();
}

ejecutarEjercicio();