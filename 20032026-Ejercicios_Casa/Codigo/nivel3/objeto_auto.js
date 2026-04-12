
// OBJETO AUTO

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
    console.log("\n=== OBJETO AUTO 🚗 ===\n");
    
    let auto = {
        marca: "Toyota",
        modelo: "Corolla",
        año: 2020
    };
    
    console.log("🚗 Auto ACTUAL:");
    console.log("-".repeat(30));
    console.log(`   Marca: ${auto.marca}`);
    console.log(`   Modelo: ${auto.modelo}`);
    console.log(`   Año: ${auto.año}`);
    
    let nuevoAño = await preguntar("\n📅 Ingresa el NUEVO año: ");
    
    if (nuevoAño === "" || isNaN(nuevoAño)) {
        console.log("\n❌ Año inválido. No se realizaron cambios.");
        readline.close();
        return;
    }
    
    auto.año = parseInt(nuevoAño);
    
    console.log("\n" + "=".repeat(40));
    console.log("🚗 Auto ACTUALIZADO:");
    console.log("-".repeat(30));
    console.log(`   Marca: ${auto.marca}`);
    console.log(`   Modelo: ${auto.modelo}`);
    console.log(`   Año: ${auto.año} ✅`);
    
    readline.close();
}

ejecutarEjercicio();