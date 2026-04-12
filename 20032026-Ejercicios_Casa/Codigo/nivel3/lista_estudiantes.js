
// LISTA DE ESTUDIANTES 

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
    console.log("\n=== LISTA DE ESTUDIANTES 👨‍🎓 ===\n");
    
    let estudiantes = [];
    
    for (let i = 0; i < 3; i++) {
        console.log(`\n📝 Estudiante #${i + 1}:`);
        
        let nombre = await preguntar("   Nombre: ");
        if (nombre === "") nombre = "Sin nombre";
        
        let notaTexto = await preguntar("   Nota: ");
        
        if (isNaN(notaTexto)) {
            console.log("❌ Nota inválida. Se usará 0.");
            notaTexto = "0";
        }
        
        let nota = parseFloat(notaTexto);
        let estado = nota >= 6 ? "Aprobado ✅" : "Reprobado ❌";
        
        estudiantes.push({
            nombre: nombre,
            nota: nota,
            estado: estado
        });
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("📊 REPORTE DE ESTUDIANTES:");
    console.log("=".repeat(50));
    
    for (let i = 0; i < estudiantes.length; i++) {
        let e = estudiantes[i];
        console.log(`\n${i + 1}. ${e.nombre}`);
        console.log(`   Nota: ${e.nota}`);
        console.log(`   Estado: ${e.estado}`);
    }
    
    readline.close();
}

ejecutarEjercicio();