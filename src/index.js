const app = require('./app');

const PUERTO = 8080;

async function main() {
  await app.listen(PUERTO);
  console.log(`Escuchando en http://localhost:${PUERTO}`);
}

main();
