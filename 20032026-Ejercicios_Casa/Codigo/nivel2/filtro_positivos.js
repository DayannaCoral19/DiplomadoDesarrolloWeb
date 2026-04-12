// FILTRO DE POSITIVOS - Versión Terminal
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
    console.log("\n=== FILTRO DE POSITIVOS ➕ ===\n");
    console.log("Ingresa números positivos. Un número negativo termina el programa.\n");
    
    let numerosPositivos = [];
    let numero;
    
    do {
        let numeroTexto = await preguntar("Ingresa un número: ");
        
        if (numeroTexto === "") {
            console.log("❌ Debes ingresar un número.");
            continue;
        }
        
        numero = parseFloat(numeroTexto);
        
        if (isNaN(numero)) {
            console.log("❌ No es un número válido.");
            continue;
        }
        
        if (numero >= 0) {
            numerosPositivos.push(numero);
            console.log(`✅ ${numero} agregado. Total: ${numerosPositivos.length} números positivos.`);
        }
        
    } while (numero >= 0);
    
    console.log("\n" + "=".repeat(40));
    console.log(` Total de números positivos ingresados: ${numerosPositivos.length}`);
    
    if (numerosPositivos.length > 0) {
        console.log(" Lista: [" + numerosPositivos.join(", ") + "]");
    }
    
    readline.close();
}

ejecutarEjercicio();