const fs = require('fs');

const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');
const json_equipos = JSON.parse(equipos);

function buscarEquipo(idEquipo) {
  let datos;
  json_equipos.forEach((equipo) => {
    if (equipo.id == idEquipo) {
      datos = require(`../data/equipos/${equipo.tla}.json`);
    }
  });
  return datos;
}

module.exports = buscarEquipo;
