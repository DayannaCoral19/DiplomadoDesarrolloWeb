
// REEMPLAZO EN ARRAY 

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
    console.log("\n=== REEMPLAZO EN ARRAY 🔄 ===\n");
    
    let numeros = [10, 20, 30, 40, 50];
    
    console.log("📌 Array actual:");
    console.log(`   [${numeros.join(", ")}]`);
    console.log(`   Posiciones: 0, 1, 2, 3, 4\n`);
    
    let posicionTexto = await preguntar("¿Qué posición quieres reemplazar? (0 a 4): ");
    
    if (posicionTexto === "" || isNaN(posicionTexto)) {
        console.log("\n❌ Posición inválida.");
        readline.close();
        return;
    }
    
    let posicion = parseInt(posicionTexto);
    
    if (posicion < 0 || posicion > 4) {
        console.log("\n❌ Error: La posición debe ser entre 0 y 4.");
        readline.close();
        return;
    }
    
    console.log(`\n   Valor actual en posición ${posicion}: ${numeros[posicion]}`);
    
    let nuevoValorTexto = await preguntar("Ingresa el NUEVO valor: ");
    
    if (nuevoValorTexto === "" || isNaN(nuevoValorTexto)) {
        console.log("\n❌ Valor inválido.");
        readline.close();
        return;
    }
    
    let nuevoValor = parseFloat(nuevoValorTexto);
    
    // REEMPLAZAR
    numeros[posicion] = nuevoValor;
    
    console.log("\n" + "=".repeat(40));
    console.log("✅ Array ACTUALIZADO:");
    console.log(`   [${numeros.join(", ")}]`);
    console.log(`\n   Se reemplazó la posición ${posicion} por ${nuevoValor}`);
    
    readline.close();
}

ejecutarEjercicio();