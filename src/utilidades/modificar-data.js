const fs = require('fs');
const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');
const json_equipos = JSON.parse(equipos);

function obtenerDatosEquipo(idEquipo) {
  for (let i = 0; i < json_equipos.length; i++) {
    if (idEquipo == json_equipos[i].id) {
      return [i, json_equipos[i].tla];
    }
  }
}

function crearEquipo(datosEquipo, imagenEquipo) {
  const tlaEquipo = datosEquipo.nombre.substring(0, 3).toUpperCase();
  const nuevoEquipo = {
    id: datosEquipo.nombre,
    name: datosEquipo.nombre,
    area: {
      name: datosEquipo.pais,
    },
    tla: tlaEquipo,
    crestUrl: `/static/imagenes/${imagenEquipo.originalname}`,
    address: datosEquipo.direccion,
    founded: datosEquipo.fundacion,
    venue: datosEquipo.estadio,
  };
  json_equipos.push(nuevoEquipo);
  const equiposActualizados = JSON.stringify(json_equipos);
  const equipoAgregado = JSON.stringify(nuevoEquipo);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.writeFileSync(`./data/equipos/${tlaEquipo}.json`, equipoAgregado, 'utf-8');
}

function editarEquipo(idEquipo, datosEquipo, imagenEquipo) {
  const [posicionEquipo, tlaEquipo] = obtenerDatosEquipo(idEquipo);
  const nuevosDatos = {
    id: datosEquipo.nombre,
    name: datosEquipo.nombre,
    area: {
      name: datosEquipo.pais,
    },
    tla: tlaEquipo,
    crestUrl: `/static/imagenes/${imagenEquipo.originalname}`,
    address: datosEquipo.direccion,
    founded: datosEquipo.fundacion,
    venue: datosEquipo.estadio,
  };
  json_equipos.splice(posicionEquipo, 1, nuevosDatos);
  const equiposActualizados = JSON.stringify(json_equipos);
  const equipoActualizado = JSON.stringify(nuevosDatos);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.writeFileSync(
    `./data/equipos/${tlaEquipo}.json`,
    equipoActualizado,
    'utf-8'
  );
}

function eliminarEquipo(idEquipo, imagenEquipo) {
  const [indiceEquipo, tlaEquipo] = obtenerDatosEquipo(idEquipo);
  json_equipos.splice(indiceEquipo, 1);
  const equiposActualizados = JSON.stringify(json_equipos);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.unlinkSync(`./data/equipos/${tlaEquipo}.json`);
}

exports.crearEquipo = crearEquipo;
exports.editarEquipo = editarEquipo;
exports.eliminarEquipo = eliminarEquipo;
