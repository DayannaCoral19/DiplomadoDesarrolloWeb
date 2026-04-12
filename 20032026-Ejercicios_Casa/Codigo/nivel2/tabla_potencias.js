
// TABLA DE POTENCIAS 
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
    console.log("\n=== TABLA DE POTENCIAS ===\n");
    
    let numeroTexto = await preguntar("Ingresa un número: ");
    
    if (numeroTexto === "" || isNaN(numeroTexto)) {
        console.log("❌ Número inválido");
        readline.close();
        return;
    }
    
    let numero = parseFloat(numeroTexto);
    let potencia;
    
    console.log(`\n FOR:`);
    for (let i = 1; i <= 5; i++) {
        potencia = Math.pow(numero, i);
        console.log(`   ${numero}^${i} = ${potencia}`);
    }
    
    console.log(`\n WHILE:`);
    let j = 1;
    while (j <= 5) {
        potencia = Math.pow(numero, j);
        console.log(`   ${numero}^${j} = ${potencia}`);
        j++;
    }
    
    console.log(`\n DO-WHILE:`);
    let k = 1;
    do {
        potencia = Math.pow(numero, k);
        console.log(`   ${numero}^${k} = ${potencia}`);
        k++;
    } while (k <= 5);
    
    readline.close();
}

ejecutarEjercicio();