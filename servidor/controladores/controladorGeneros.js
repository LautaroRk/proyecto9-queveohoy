const con = require('../lib/conexionbd');

function obtenerGeneros(req, res) {

    console.log(req.query);

    let sql = 'SELECT * FROM `genero`';

    con.query(sql, (error, result) => {
        if(error) res.send(error);

        let response = {
            'generos': result
        };
        res.send(response);
    });
};

module.exports = {
    obtenerGeneros : obtenerGeneros
};