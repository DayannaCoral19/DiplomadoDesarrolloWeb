// CALCULADORA DE HELADOS 
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
    console.log("\n=== CALCULADORA DE HELADOS ===\n");
    
    const PRECIO_BASE = 5;
    let precioFinal = PRECIO_BASE;
    
    console.log("Toppings disponibles:");
    console.log("Oreo");
    console.log("KitKat");
    console.log("Brownie");
    
    let topping = await preguntar("\n¿Qué topping quieres? (escribe el nombre): ");
    
    // Usar switch con el nombre 
    switch (topping.toLowerCase()) {
        case "oreo":
            precioFinal += 2;
            console.log("\n Elegiste Oreo");
            break;
        case "kitkat":
            precioFinal += 3;
            console.log("\n Elegiste KitKat");
            break;
        case "brownie":
            precioFinal += 4;
            console.log("\n Elegiste Brownie");
            break;
        default:
            console.log("\n❌ Topping no válido. Solo: Oreo, KitKat o Brownie");
            readline.close();
            return;
    }
    
    console.log(` Precio total: $${precioFinal}`);
    readline.close();
}

ejecutarEjercicio();