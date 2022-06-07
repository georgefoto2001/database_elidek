const { pool } = require('../utils/database');

exports.getDisplayTable = (req, res) => {
    var table_name = req.query.table;

    pool.getConnection((err, conn) => {
        conn.promise().query("select * from " + table_name)
        .then(([rows, fields]) => {
            res.render('show_results.ejs', {
                pageTitle : 'Insert '+table_name,
                result : rows,
                not_found_message: 'No tuples in '+table_name
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

    
}