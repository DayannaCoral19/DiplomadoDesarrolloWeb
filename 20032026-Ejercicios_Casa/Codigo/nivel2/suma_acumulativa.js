// SUMA ACUMULATIVA 
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
    console.log("\n=== SUMA ACUMULATIVA ===\n");
    
    let Ntexto = await preguntar("Ingresa un número N (sumaremos 1+2+...+N): ");
    
    if (Ntexto === "" || isNaN(Ntexto)) {
        console.log("❌ Número inválido");
        readline.close();
        return;
    }
    
    let N = parseInt(Ntexto);
    let suma;
    
    // VERSIÓN FOR 
    suma = 0;
    for (let i = 1; i <= N; i++) {
        suma += i;
    }
    console.log(`\n FOR: 1+2+...+${N} = ${suma}`);
    
    // VERSIÓN WHILE 
    suma = 0;
    let i = 1;
    while (i <= N) {
        suma += i;
        i++;
    }
    console.log(` WHILE: 1+2+...+${N} = ${suma}`);
    
    // VERSIÓN DO-WHILE
    suma = 0;
    let j = 1;
    do {
        suma += j;
        j++;
    } while (j <= N);
    console.log(`DO-WHILE: 1+2+...+${N} = ${suma}`);
    
    readline.close();
}

ejecutarEjercicio();