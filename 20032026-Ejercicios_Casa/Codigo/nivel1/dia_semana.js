// DÍA DE LA SEMANA 
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
    console.log("\n=== DÍA DE LA SEMANA ===\n");
    console.log("1 = Lunes, 2 = Martes, ..., 7 = Domingo\n");
    
    let numeroTexto = await preguntar("Ingresa un número del 1 al 7: ");
    
    if (numeroTexto === "" || isNaN(numeroTexto)) {
        console.log("\n❌ Error: Debes ingresar un número.");
        readline.close();
        return;
    }
    
    let dia = parseInt(numeroTexto);
    let nombreDia = "";
    
    switch (dia) {
        case 1: nombreDia = "Lunes"; break;
        case 2: nombreDia = "Martes"; break;
        case 3: nombreDia = "Miércoles"; break;
        case 4: nombreDia = "Jueves"; break;
        case 5: nombreDia = "Viernes"; break;
        case 6: nombreDia = "Sábado"; break;
        case 7: nombreDia = "Domingo"; break;
        default:
            console.log("\n❌ Error: El número debe estar entre 1 y 7.");
            readline.close();
            return;
    }
    
    console.log(`\n El día ${dia} es: ${nombreDia}`);
    readline.close();
}

ejecutarEjercicio();