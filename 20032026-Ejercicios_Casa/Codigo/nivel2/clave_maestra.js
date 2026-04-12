// CLAVE MAESTRA 
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
    console.log("\n=== CLAVE MAESTRA ===\n");
    
    const CONTRASENA_CORRECTA = "SESAMO123";
    let contrasena = "";
    let intentos = 0;
    
    while (contrasena !== CONTRASENA_CORRECTA) {
        intentos++;
        contrasena = await preguntar(`Intento #${intentos}: Ingresa la contraseña: `);
        
        if (contrasena === null || contrasena === "") {
            console.log("\n⚠️ Operación cancelada.");
            readline.close();
            return;
        }
        
        if (contrasena !== CONTRASENA_CORRECTA) {
            console.log("❌ Contraseña incorrecta. Intenta de nuevo.\n");
        }
    }
    
    console.log("\n✅ ¡ACCESO CONCEDIDO! Contraseña correcta.");
    readline.close();
}

ejecutarEjercicio();