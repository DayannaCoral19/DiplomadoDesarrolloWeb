// PAR O IMPAR 
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
    console.log("\n=== PAR O IMPAR ===\n");
    
    let numeroTexto = await preguntar("Ingresa un número entero: ");
    
    if (numeroTexto === "" || isNaN(numeroTexto)) {
        console.log("\n❌ Error: Debes ingresar un número.");
        readline.close();
        return;
    }
    
    let numero = parseInt(numeroTexto);
    
    // Operador módulo: % devuelve el residuo
    if (numero % 2 === 0) {
        console.log(`\n✅ El número ${numero} es PAR`);
    } else {
        console.log(`\n❌ El número ${numero} es IMPAR`);
    }
    
    readline.close();
}

ejecutarEjercicio();