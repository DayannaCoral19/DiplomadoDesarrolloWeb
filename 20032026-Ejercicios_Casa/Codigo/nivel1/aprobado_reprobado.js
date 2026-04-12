// APROBADO O REPROBADO 
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
    console.log("\n=== APROBADO O REPROBADO 📝 ===\n");
    
    // Pedir las 3 notas
    let nota1Texto = await preguntar("Ingresa la primera nota: ");
    let nota2Texto = await preguntar("Ingresa la segunda nota: ");
    let nota3Texto = await preguntar("Ingresa la tercera nota: ");
    
    // Validar
    if (isNaN(nota1Texto) || isNaN(nota2Texto) || isNaN(nota3Texto)) {
        console.log("\n❌ Error: Todas las notas deben ser números.");
        readline.close();
        return;
    }
    
    let nota1 = parseFloat(nota1Texto);
    let nota2 = parseFloat(nota2Texto);
    let nota3 = parseFloat(nota3Texto);
    
    // Calcular promedio
    let promedio = (nota1 + nota2 + nota3) / 3;
    promedio = Math.round(promedio * 100) / 100; // Redondear a 2 decimales
    
    console.log(`\n Promedio: ${promedio}`);
    
    if (promedio >= 6) {
        console.log("✅ APROBADO");
    } else {
        console.log("❌ REPROBADO");
    }
    
    readline.close();
}

ejecutarEjercicio();