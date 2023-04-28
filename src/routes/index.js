const { Router } = require('express');
const router = Router();
const fs = require('fs');
const multer = require('multer');
const {
  crearEquipo,
  eliminarEquipo,
  editarEquipo,
} = require('../utilidades/modificar-data');
const buscarEquipo = require('../utilidades/buscar-data');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/imagenes');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');
const json_equipos = JSON.parse(equipos);

router.get('/', (req, res) => {
  res.render('home', {
    layout: 'index',
    data: {
      equipos: json_equipos,
    },
  });
});

router.get('/equipo/:idEquipo/ver', (req, res) => {
  let datos = buscarEquipo(req.params.idEquipo);
  res.render('ver_equipo', {
    layout: 'index',
    equipo: {
      id: datos.id,
      nombre: datos.name,
      imagen: datos.crestUrl,
      fundacion: datos.founded,
      estadio: datos.venue,
      direccion: datos.address,
    },
  });
});

router.get('/equipo/crear-equipo', (req, res) => {
  res.render('crear_equipo', {
    layout: 'index',
  });
});

router.post('/equipo/crear-equipo', upload.single('imagen'), (req, res) => {
  const datosRecibidos = req.body;
  const imagenSubida = req.file;
  crearEquipo(datosRecibidos, imagenSubida);
  res.render('crear_equipo', {
    layout: 'index',
    mensaje: 'Haz agregado con éxito un nuevo equipo',
  });
});

router.get('/equipo/:idEquipo/editar', (req, res) => {
  const datosEquipo = buscarEquipo(req.params.idEquipo);
  res.render('editar_equipo', {
    layout: 'index',
    equipo: datosEquipo,
  });
});

router.post('/equipo/:idEquipo/editar', upload.single('imagen'), (req, res) => {
  const idEquipo = req.params.idEquipo;
  const datosRecibidos = req.body;
  const imagenSubida = req.file;
  editarEquipo(idEquipo, datosRecibidos, imagenSubida);
  const datosEquipo = buscarEquipo(idEquipo);
  res.render('editar_equipo', {
    layout: 'index',
    mensaje: 'Haz editado con éxito un equipo',
    equipo: datosEquipo,
  });
});

router.get('/equipo/:idEquipo/eliminar', (req, res) => {
  const datosEquipo = buscarEquipo(req.params.idEquipo);
  res.render('eliminar_equipo', {
    layout: 'index',
    equipo: datosEquipo,
  });
});

router.post('/equipo/:idEquipo/eliminar', (req, res) => {
  const datosEquipo = buscarEquipo(req.params.idEquipo);
  eliminarEquipo(req.params.idEquipo, datosEquipo.crestUrl);
  res.render('eliminar_equipo', {
    layout: 'index',
    mensaje: 'Haz eliminado con éxito un equipo',
    equipo: datosEquipo,
  });
});

module.exports = router;
