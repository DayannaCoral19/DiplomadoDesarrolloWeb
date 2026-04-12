// MÚLTIPLOS DE 5 -
console.log("\n=== MÚLTIPLOS DE 5 (1 al 50) ===\n");

//  VERSIÓN FOR 
process.stdout.write(" FOR: ");
for (let i = 1; i <= 50; i++) {
    if (i % 5 === 0) {
        process.stdout.write(i + " ");
    }
}
console.log("\n");

//  VERSIÓN WHILE 
process.stdout.write(" WHILE: ");
let i = 1;
while (i <= 50) {
    if (i % 5 === 0) {
        process.stdout.write(i + " ");
    }
    i++;
}
console.log("\n");

//  VERSIÓN DO-WHILE 
process.stdout.write(" DO-WHILE: ");
let j = 1;
do {
    if (j % 5 === 0) {
        process.stdout.write(j + " ");
    }
    j++;
} while (j <= 50);
console.log("\n");