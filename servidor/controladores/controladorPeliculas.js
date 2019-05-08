const con = require('../lib/conexionbd');

function getPeliculas(req, res) {

    console.log(req.query);

    // Pedido base
    let sql = 'SELECT * FROM `pelicula`';

    // Se inicializa el array que va a contener los filtros
    let filtros = [];

    // Se agregan al array los filtros si fueron pasados por query
    if (req.query.titulo) filtros.push('`titulo` LIKE "%' + req.query.titulo + '%"');
    if (req.query.genero) filtros.push('`genero_id` = ' + req.query.genero);
    if (req.query.anio) filtros.push('`anio` = ' + req.query.anio);

    // Si se pasaron filtros, estos son concatenados al pedido
    if (filtros.length) {
        sql = sql.concat(' WHERE ');
        for (let i = 0; i < filtros.length; i++) {
            sql = sql.concat(filtros[i]);

            // Si NO es el último, se prepara para concatenar el siguiente
            if (i < (filtros.length - 1)) {
                sql = sql.concat(' AND ');
            };
        };
    };
    sql = sql.concat(' ORDER BY `titulo` LIMIT 30');

    console.log(sql);

    // Se envía la query
    con.query(sql, (error, result) => {
        if(error) res.send(error);
        
        let response = {
            'peliculas': result
        };
        res.send(response);
    });
};

module.exports = {
    obtenerPeliculas : obtenerPeliculas
};