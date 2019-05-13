//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorPeliculas = require('./controladores/controladorPeliculas');
var controladorGeneros = require('./controladores/controladorGeneros');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/peliculas', controladorPeliculas.obtenerPeliculas);
app.get('/generos', controladorGeneros.obtenerGeneros);
app.get('/peliculas/:id', controladorPeliculas.obtenerInfoPelicula); //REVISAR

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

