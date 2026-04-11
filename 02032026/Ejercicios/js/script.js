// ==================== BLOQUE 1: EJERCICIOS BÁSICOS ====================

function ejercicioPropina() {
    let cuenta = 150;
    let propina = cuenta * 0.10;
    let total = cuenta + propina;
    document.getElementById('resultadoPropina').innerHTML = `
        💵 Cuenta: $${cuenta}<br>
        🎁 Propina (10%): $${propina}<br>
        💲 <strong>Total a pagar: $${total}</strong>
    `;
    console.log(`Propina: Cuenta $${cuenta}, propina $${propina}, total $${total}`);
}

function ejercicioConcatenar() {
    let nombre = "EjemploNataly";
    let apellido = "EjemploReyes";
    let nombreCompleto = nombre + " " + apellido;
    let tipoDato = typeof nombreCompleto;
    document.getElementById('resultadoConcatenar').innerHTML = `
        📛 Nombre completo: <strong>${nombreCompleto}</strong><br>
        📊 Tipo de dato: <strong>${tipoDato}</strong> (string)
    `;
    console.log(`Concatenación: ${nombreCompleto}, Tipo: ${tipoDato}`);
}

function ejercicioContador() {
    let puntos = 10;
    puntos = puntos + 5;
    puntos = puntos - 2;
    document.getElementById('resultadoContador').innerHTML = `
        🔢 Puntos finales: <strong>${puntos}</strong><br>
        📝 Proceso: 10 → +5 = 15 → -2 = ${puntos}
    `;
    console.log(`Contador: Puntos finales = ${puntos}`);
}

function ejercicioAniosADias() {
    let edad = parseInt(document.getElementById('edadUsuario').value);
    let totalDias = edad * 365;
    document.getElementById('resultadoAniosADias').innerHTML = `
        🎂 Edad: ${edad} años<br>
        📅 Días vividos aproximadamente: <strong>${totalDias.toLocaleString()} días</strong>
    `;
    console.log(`Años a días: ${edad} años = ${totalDias} días`);
}

function ejercicioResto() {
    let galletas = 17;
    let amigos = 3;
    let sobrantes = galletas % amigos;
    let porPersona = Math.floor(galletas / amigos);
    document.getElementById('resultadoResto').innerHTML = `
        🍪 Galletas: ${galletas}<br>
        👥 Amigos: ${amigos}<br>
        📦 Cada uno recibe: ${porPersona} galletas<br>
        ⭐ <strong>Sobran: ${sobrantes} galletas</strong>
    `;
    console.log(`Resto: ${galletas} % ${amigos} = ${sobrantes}`);
}

// ==================== BLOQUE 2: INTERMEDIO ====================

function ejercicioLogica() {
    let resultado = (10 > 5) && (3 < 1);
    let explicacion = "(10 > 5) es TRUE, (3 < 1) es FALSE → TRUE && FALSE = FALSE";
    document.getElementById('resultadoLogica').innerHTML = `
        🧠 Operación: (10 > 5) && (3 < 1)<br>
        📌 Resultado: <strong>${resultado}</strong><br>
        📖 Explicación: ${explicacion}
    `;
    console.log(`Lógica: (10>5)&&(3<1) = ${resultado}`);
}

function ejercicioComparacion() {
    let comparacion = (20 == "20");
    let comparacionEstricta = (20 === "20");
    document.getElementById('resultadoComparacion').innerHTML = `
        🔍 20 == "20" → <strong>${comparacion}</strong> (solo compara valor, convierte string a número)<br>
        🔒 20 === "20" → <strong>${comparacionEstricta}</strong> (compara valor Y tipo de dato)<br>
        💡 Explicación: == permite coerción, === es estricto
    `;
    console.log(`Comparación: == ${comparacion}, === ${comparacionEstricta}`);
}

function ejercicioPrioridad() {
    let operacion = 10 + 5 * 2 / (4 - 2);
    // Paso a paso: (4-2)=2, luego 5*2=10, luego 10/2=5, luego 10+5=15
    document.getElementById('resultadoPrioridad').innerHTML = `
        📐 Operación: 10 + 5 * 2 / (4 - 2)<br>
        🧮 Paso a paso:<br>
        1️⃣ (4 - 2) = 2<br>
        2️⃣ 5 * 2 = 10<br>
        3️⃣ 10 / 2 = 5<br>
        4️⃣ 10 + 5 = <strong>15</strong><br>
        ✅ Resultado final: <strong>15</strong>
    `;
    console.log(`Prioridad: 10+5*2/(4-2) = 15`);
}

function ejercicioNegacion() {
    let esVerdadero = !false || (false && true);
    // !false = true, (false && true)=false, true || false = true
    document.getElementById('resultadoNegacion').innerHTML = `
        ❓ Operación: !false || (false && true)<br>
        🧮 Paso a paso:<br>
        1️⃣ !false = <strong>true</strong><br>
        2️⃣ false && true = <strong>false</strong><br>
        3️⃣ true || false = <strong>true</strong><br>
        ✅ Resultado final: <strong>${esVerdadero}</strong>
    `;
    console.log(`Negación y OR: ${esVerdadero}`);
}

function ejercicioCoercion() {
    let a = "5" + 2;
    let b = "5" - 2;
    document.getElementById('resultadoCoercion').innerHTML = `
        🔄 "5" + 2 = <strong>${a}</strong> (${typeof a}) → El + concatena string con número<br>
        🔄 "5" - 2 = <strong>${b}</strong> (${typeof b}) → El - convierte el string a número y resta<br>
        💡 Explicación: El operador + prioriza string, el - prioriza número
    `;
    console.log(`Coerción: "5"+2=${a} (${typeof a}), "5"-2=${b} (${typeof b})`);
}

// ==================== BLOQUE 3: CONDICIONALES ====================

function ejercicioPortero() {
    let edad = parseInt(document.getElementById('edadDisco').value);
    let mensaje;
    if (edad >= 18) {
        mensaje = "✅ ¡Puedes entrar a la discoteca! 🎉";
    } else {
        let faltan = 18 - edad;
        mensaje = `❌ Quédate en casa. Te faltan ${faltan} años para entrar. 🏠`;
    }
    document.getElementById('resultadoPortero').innerHTML = mensaje;
    console.log(`Portero: Edad ${edad} - ${mensaje}`);
}

function ejercicioTemperatura() {
    let clima = parseInt(document.getElementById('temperatura').value);
    let mensaje;
    if (clima > 30) {
        mensaje = "🔥 ¡Hace calor! Bebe agua 🧊";
    } else {
        mensaje = "🍃 Está fresco, buen día para caminar 🚶";
    }
    document.getElementById('resultadoTemperatura').innerHTML = mensaje;
    console.log(`Temperatura: ${clima}°C - ${mensaje}`);
}

function ejercicioPassword() {
    let passwordDigitada = document.getElementById('passwordInput').value;
    let passwordReal = "admin";
    let mensaje;
    if (passwordDigitada === passwordReal) {
        mensaje = "🔓 ¡Acceso concedido! Bienvenido ✅";
    } else {
        mensaje = "🔒 Error de clave. Intenta de nuevo ❌";
    }
    document.getElementById('resultadoPassword').innerHTML = mensaje;
    console.log(`Password: ${passwordDigitada === passwordReal ? "Correcta" : "Incorrecta"}`);
}

function ejercicioParImpar() {
    let numero = parseInt(document.getElementById('numeroPar').value);
    let mensaje;
    if (numero % 2 === 0) {
        mensaje = `🔢 El número ${numero} es <strong>PAR</strong> ✅`;
    } else {
        mensaje = `🔢 El número ${numero} es <strong>IMPAR</strong> 🔄`;
    }
    document.getElementById('resultadoParImpar').innerHTML = mensaje;
    console.log(`Par/Impar: ${numero} es ${numero%2===0 ? "par" : "impar"}`);
}

function ejercicioDescuento() {
    let compra = parseFloat(document.getElementById('compraMonto').value);
    let total;
    if (compra > 80) {
        total = compra - 20;
        document.getElementById('resultadoDescuento').innerHTML = `
            🛒 Compra original: $${compra}<br>
            🎉 Descuento aplicado: -$20<br>
            💰 <strong>Total a pagar: $${total}</strong>
        `;
    } else {
        total = compra;
        document.getElementById('resultadoDescuento').innerHTML = `
            🛒 Compra: $${compra}<br>
            ⚠️ Sin descuento (mínimo $80 para descuento)<br>
            💰 <strong>Total a pagar: $${total}</strong>
        `;
    }
    console.log(`Descuento: Compra $${compra} → Total $${total}`);
}

function ejercicioSemaforo() {
    let color = document.getElementById('semaforoColor').value;
    let hayPeatones = document.getElementById('hayPeatones').checked;
    let mensaje;
    
    if (color === "verde") {
        if (hayPeatones) {
            mensaje = "🚦 Espera un momento... los peatones están cruzando 🚶‍♂️🚶‍♀️";
        } else {
            mensaje = "🚗 Sigue adelante con precaución ✅";
        }
    } else {
        mensaje = "🛑 ¡DETENTE! El semáforo está en " + color;
    }
    document.getElementById('resultadoSemaforo').innerHTML = mensaje;
    console.log(`Semáforo: ${color}, peatones:${hayPeatones} → ${mensaje}`);
}

function ejercicioCalificacion() {
    let nota = parseInt(document.getElementById('notaEscolar').value);
    let mensaje;
    
    if (nota >= 60) {
        if (nota > 90) {
            mensaje = "🌟 ¡EXCELENTE! Calificación sobresaliente 🌟";
        } else {
            mensaje = "✅ APROBADO. Buen trabajo, sigue mejorando 📚";
        }
    } else {
        mensaje = "❌ REPROBADO. Necesitas estudiar más 💪";
    }
    document.getElementById('resultadoCalificacion').innerHTML = `
        📊 Nota: ${nota}<br>
        🎓 Resultado: ${mensaje}
    `;
    console.log(`Calificación: ${nota} → ${mensaje}`);
}

function ejercicioLuces() {
    let esDeNoche = document.getElementById('esDeNoche').checked;
    let movimientoDetectado = document.getElementById('movimientoDetectado').checked;
    let mensaje;
    
    if (esDeNoche) {
        if (movimientoDetectado) {
            mensaje = "💡 ENCENDER LUCES - Movimiento detectado 🌟";
        } else {
            mensaje = "🔋 Luces en MODO AHORRO - Sin movimiento ⚡";
        }
    } else {
        mensaje = "☀️ Luces APAGADAS - Es de día 💡";
    }
    document.getElementById('resultadoLuces').innerHTML = mensaje;
    console.log(`Luces: noche=${esDeNoche}, movimiento=${movimientoDetectado} → ${mensaje}`);
}

function ejercicioCajero() {
    let saldo = parseFloat(document.getElementById('saldoCajero').value);
    let montoRetiro = parseFloat(document.getElementById('montoRetiro').value);
    let mensaje;
    
    if (montoRetiro <= saldo) {
        saldo -= montoRetiro;
        mensaje = `✅ RETIRO EXITOSO. Retiraste $${montoRetiro}<br>💰 Nuevo saldo: $${saldo}`;
    } else {
        if (montoRetiro > 1000) {
            mensaje = "⚠️ LÍMITE DIARIO EXCEDIDO. Máximo $1000 por transacción ❌";
        } else {
            mensaje = `❌ SALDO INSUFICIENTE. Tu saldo es $${saldo} y quieres retirar $${montoRetiro}`;
        }
    }
    document.getElementById('resultadoCajero').innerHTML = mensaje;
    console.log(`Cajero: Saldo $${saldo}, Retiro $${montoRetiro} → ${mensaje}`);
}

function ejercicioTransporte() {
    let distancia = parseFloat(document.getElementById('distanciaViaje').value);
    let tengoBici = document.getElementById('tengoBici').checked;
    let mensaje;
    
    if (distancia < 5) {
        mensaje = "🚶‍♀️ RECOMENDACIÓN: Camina 🚶‍♂️ (distancia corta: " + distancia + " km)";
    } else {
        if (tengoBici) {
            mensaje = "🚲 RECOMENDACIÓN: Ve en bicicleta 🚴 (distancia: " + distancia + " km)";
        } else {
            mensaje = "🚌 RECOMENDACIÓN: Toma el bus 🚍 (distancia: " + distancia + " km)";
        }
    }
    document.getElementById('resultadoTransporte').innerHTML = mensaje;
    console.log(`Transporte: distancia ${distancia}km, bici=${tengoBici} → ${mensaje}`);
}

// ==================== NAVEGACIÓN ENTRE SECCIONES ====================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar active de todos los botones
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Mostrar sección correspondiente
        const sectionId = btn.getAttribute('data-section');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

console.log("🚀 Página cargada correctamente. Todos los ejercicios están listos!");