
// BUSCADOR DE NOMBRES 

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
    console.log("\n=== BUSCADOR DE NOMBRES 🔍 ===\n");
    
    let listaNombres = ["Ana", "Carlos", "María", "José", "Laura"];
    
    console.log("📋 Lista actual:");
    console.log("-".repeat(20));
    for (let i = 0; i < listaNombres.length; i++) {
        console.log(`   ${i + 1}. ${listaNombres[i]}`);
    }
    
    let nombreBuscar = await preguntar("\n🔎 ¿Qué nombre quieres buscar? ");
    
    if (nombreBuscar === "") {
        console.log("\n❌ No ingresaste ningún nombre.");
        readline.close();
        return;
    }
    
    let encontrado = false;
    let posicion = -1;
    
    for (let i = 0; i < listaNombres.length; i++) {
        if (listaNombres[i].toLowerCase() === nombreBuscar.toLowerCase()) {
            encontrado = true;
            posicion = i;
            break;
        }
    }
    
    console.log("\n" + "=".repeat(40));
    if (encontrado) {
        console.log(`✅ ¡${nombreBuscar} SÍ está en la lista! (Posición ${posicion + 1})`);
    } else {
        console.log(`❌ ${nombreBuscar} NO está en la lista.`);
    }
    
    readline.close();
}

ejecutarEjercicio();