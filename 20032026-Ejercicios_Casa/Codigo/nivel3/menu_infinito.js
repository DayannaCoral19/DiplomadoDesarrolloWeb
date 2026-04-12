
// MENÚ INFINITO 

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
    console.log("\n=== MENÚ INFINITO 📋 ===\n");
    
    let opcion;
    let historial = [];
    
    do {
        console.log("\n" + "=".repeat(30));
        console.log("📌 MENÚ PRINCIPAL");
        console.log("=".repeat(30));
        console.log("1. 👋 Saludar");
        console.log("2. 👋 Despedirse");
        console.log("3. 🚪 Salir");
        console.log("-".repeat(30));
        
        opcion = await preguntar("Elige una opción (1, 2 o 3): ");
        
        switch (opcion) {
            case "1":
                console.log("\n¡HOLA! ¿Cómo estás? 😊");
                historial.push("✅ Saludó");
                break;
            case "2":
                console.log("\n¡ADIÓS! ¡Hasta luego! 👋");
                historial.push("✅ Se despidió");
                break;
            case "3":
                console.log("\n👋 Saliendo del programa...");
                historial.push("🚪 Salió del menú");
                break;
            default:
                console.log("\n❌ Opción no válida. Elige 1, 2 o 3.");
                historial.push("❌ Opción inválida");
                break;
        }
        
    } while (opcion !== "3");
    
    console.log("\n" + "=".repeat(40));
    console.log("📜 HISTORIAL DE ACCIONES:");
    console.log("=".repeat(40));
    
    for (let i = 0; i < historial.length; i++) {
        console.log(`   ${i + 1}. ${historial[i]}`);
    }
    
    console.log("\n✨ ¡Gracias por usar el programa! ✨");
    readline.close();
}

ejecutarEjercicio();