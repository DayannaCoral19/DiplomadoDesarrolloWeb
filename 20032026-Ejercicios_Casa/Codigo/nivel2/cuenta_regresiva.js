// CUENTA REGRESIVA - 3 formas en un solo archivo
console.log("\n=== CUENTA REGRESIVA (10 a 1) ===\n");

// VERSIÓN FOR 
console.log(" FOR:");
for (let i = 10; i >= 1; i--) {
    process.stdout.write(i + " ");
}
console.log("\n");

// VERSIÓN WHILE 
console.log(" WHILE:");
let i = 10;
while (i >= 1) {
    process.stdout.write(i + " ");
    i--;
}
console.log("\n");

// VERSIÓN DO-WHILE 
console.log(" DO-WHILE:");
let j = 10;
do {
    process.stdout.write(j + " ");
    j--;
} while (j >= 1);
console.log("\n");