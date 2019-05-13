const con = require("../lib/conexionbd");

function obtenerPeliculas(req, res) {
  console.log(req.query);

  // Pedido base
  let sql = "SELECT *, (contador) FROM pelicula";

  // Se inicializa el array que va a contener los filtros
  let filtros = [];

  // Se agregan al array los filtros si fueron pasados por query
  if (req.query.titulo) filtros.push('titulo LIKE "%' + req.query.titulo + '%"');
  if (req.query.genero) filtros.push("genero_id = " + req.query.genero);
  if (req.query.anio) filtros.push("anio = " + req.query.anio);

  // Si se pasaron filtros, estos son concatenados al pedido
  if (filtros.length) {
    sql = sql.concat(" WHERE ");
    for (let i = 0; i < filtros.length; i++) {
      sql = sql.concat(filtros[i]);

      // Si NO es el último, se prepara para concatenar el siguiente
      if (i < filtros.length - 1) {
        sql = sql.concat(" AND ");
      }
    }
  }

  // Se genera la sub-query contador y se inserta dentro de la query final
  let contador =  '(' + sql.replace('*, (contador)', 'COUNT(id)') + ') AS total';
  sql = sql.replace('(contador)', contador);

  // Se agregan el orden y el limite al pedido
  let orden = ` ORDER BY ${req.query.columna_orden} ${req.query.tipo_orden}`;
  sql = sql.concat(orden);
  let limite = ` LIMIT ${(req.query.pagina - 1) * req.query.cantidad}, ${req.query.cantidad}`;
  sql = sql.concat(limite);

  console.log(sql);

  // Se envía la query
  con.query(sql, (error, result) => {
    if (error) res.send(error);

    let response = {
      peliculas: result,
      total: result.length ? result[0].total : 0
    };

    console.log("SHOWN: ", response.peliculas.length);
    console.log("TOTAL: ", response.total);
    res.send(response);
  });
};

function obtenerInfoPelicula(req, res) {

  console.log(req.params);

  // Se genera una query que devuelve la pelicula correspondiente al id con genero y actores
  let sql = 'SELECT pelicula.*, genero.nombre AS genero, actor.nombre AS actor FROM pelicula '
  + 'JOIN genero ON pelicula.genero_id = genero.id '
  + 'JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id '
  + 'JOIN actor ON actor_pelicula.actor_id = actor.id '
  + 'WHERE pelicula.id = ' + req.params.id;

  console.log(sql);
  con.query(sql, (error, result) => {
    if(error) res.send(error);

    let actores = result.map(element => element.actor);

    let response = {
      pelicula: result[0],
      actores: actores
    }

    res.send(response);
  })
}

module.exports = {
  obtenerPeliculas: obtenerPeliculas,
  obtenerInfoPelicula: obtenerInfoPelicula
};
