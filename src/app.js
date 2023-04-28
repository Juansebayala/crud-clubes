const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

hbs.handlebars.registerHelper('getLength', function (objeto) {
  return Object.keys(objeto).length;
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use(require('./routes/index'));

module.exports = app;
