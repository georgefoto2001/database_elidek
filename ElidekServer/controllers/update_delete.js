const { pool } = require('../utils/database');

exports.getUpdateDeleteForm = (req, res) => {

    var table_name = req.query.table;
    
    if (table_name == 'Deliverable') {
        pool.getConnection((err, conn) => {
            conn.promise().query(`select * from ${table_name}`)
            .then(([rows, fields]) => {
                res.render(`update_delete/${table_name}.ejs`, {
                    pageTitle : 'Update or Delete',
                    table_rows: rows
                })
            })
            .then(() => pool.releaseConnection(conn))
            .catch(err => console.log(err))
        })

        
    }
    else {
        req.flash('messages', { type: 'warning', value: `Insertion in ${table_name} is not yet implemented.` })
        res.redirect('/');
    }
}