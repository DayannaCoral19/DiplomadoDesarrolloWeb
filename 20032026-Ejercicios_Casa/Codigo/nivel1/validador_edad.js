// VALIDADOR DE EDAD 
// En Node.js, para pedir datos por terminal necesitamos readline
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas 
function preguntar(pregunta) {
    return new Promise((resolve) => {
        readline.question(pregunta, resolve);
    });
}

// Función principal del ejercicio
async function ejecutarEjercicio() {
    console.log("\n=== VALIDADOR DE EDAD ===\n");
    
    // Pedir la edad
    let edadTexto = await preguntar("Ingresa tu edad: ");
    
    // Validar que sea un número
    if (edadTexto === "" || isNaN(edadTexto)) {
        console.log("\n❌ Error: Debes ingresar un número válido.");
        readline.close();
        return;
    }
    
    // Convertir a número
    let edad = parseInt(edadTexto);
    
    // Evaluar edad
    if (edad < 18) {
        console.log("\n❌ Acceso denegado. Eres menor de edad.");
    } else {
        console.log("\n✅ ¡Bienvenido! Puedes acceder.");
    }
    
    readline.close();
}

// Ejecutar el programa
ejecutarEjercicio();