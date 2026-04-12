// FILTRO DE POSITIVOS - VERSIÓN CORREGIDA
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
    let continuar = true;  //  Bandera de control
    
    while (continuar) {  //  Bucle controlado por bandera
        let numeroTexto = await preguntar("Ingresa un número: ");
        
        // Validar entrada vacía
        if (numeroTexto === "") {
            console.log("❌ Debes ingresar un número.");
            continue;  // ← Vuelve a pedir sin problemas
        }
        
        let numero = parseFloat(numeroTexto);
        
        // Validar que sea número válido
        if (isNaN(numero)) {
            console.log("❌ No es un número válido.");
            continue;  // ← Vuelve a pedir
        }
        
        // Evaluar el número ingresado
        if (numero >= 0) {
            numerosPositivos.push(numero);
            console.log(`✅ ${numero} agregado. Total: ${numerosPositivos.length} números positivos.`);
        } else {
            continuar = false;  // ← Número negativo: termina el bucle
            console.log(`🛑 Número negativo ${numero} detectado. Finalizando...`);
        }
    }
    
    // Mostrar resultados
    console.log("\n" + "=".repeat(40));
    console.log(` Total de números positivos ingresados: ${numerosPositivos.length}`);
    
    if (numerosPositivos.length > 0) {
        console.log(" Lista: [" + numerosPositivos.join(", ") + "]");
        
        // Calcular estadísticas adicionales
        let suma = numerosPositivos.reduce((a, b) => a + b, 0);
        console.log(`➕ Suma total: ${suma}`);
        console.log(` Promedio: ${(suma / numerosPositivos.length).toFixed(2)}`);
    }
    
    readline.close();
}

ejecutarEjercicio();