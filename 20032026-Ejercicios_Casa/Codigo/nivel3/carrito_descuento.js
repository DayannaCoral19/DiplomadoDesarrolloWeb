
// CARRITO CON DESCUENTO 

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
    console.log("\n=== CARRITO DE COMPRAS 🛍️ ===\n");
    console.log("Ingresa los precios de los productos (0 para terminar):\n");
    
    let total = 0;
    let productos = [];
    let contador = 1;
    let precio;
    
    do {
        let precioTexto = await preguntar(`Producto #${contador}: $`);
        
        if (precioTexto === "") {
            console.log("❌ Precio inválido. Intenta de nuevo.");
            continue;
        }
        
        precio = parseFloat(precioTexto);
        
        if (isNaN(precio)) {
            console.log("❌ No es un número válido.");
            continue;
        }
        
        if (precio < 0) {
            console.log("❌ El precio no puede ser negativo.");
            continue;
        }
        
        if (precio > 0) {
            productos.push(precio);
            total += precio;
            contador++;
        }
        
    } while (precio !== 0);
    
    console.log("\n" + "=".repeat(40));
    console.log("🧾 RESUMEN DE COMPRA:");
    console.log("=".repeat(40));
    
    for (let i = 0; i < productos.length; i++) {
        console.log(`   Producto ${i + 1}: $${productos[i].toFixed(2)}`);
    }
    
    console.log(`\n   Subtotal: $${total.toFixed(2)}`);
    
    let descuento = 0;
    if (total > 100) {
        descuento = total * 0.10;
        console.log(`   🎉 DESCUENTO 10%: -$${descuento.toFixed(2)}`);
    } else {
        let falta = 100 - total;
        console.log(`   ℹ️ Agrega $${falta.toFixed(2)} más para 10% descuento.`);
    }
    
    let totalFinal = total - descuento;
    console.log("\n" + "=".repeat(40));
    console.log(`💰 TOTAL A PAGAR: $${totalFinal.toFixed(2)}`);
    
    readline.close();
}

ejecutarEjercicio();