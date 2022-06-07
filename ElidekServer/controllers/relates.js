const { pool } = require('../utils/database');

exports.getTop3Interdisciplinary = (req,res) => {

    var sql_query = "select  r.field_name as f1,  r2.field_name as f2 ,count(*) as cnt\n"+
    "from relates r join relates r2 on r2.project_id=r.project_id\n"+
    "join Project p on p.project_id=r.project_id\n"+
    "where r2.field_name < r.field_name\n"+
    "group by r2.field_name, r.field_name order by 3 desc limit 3"
    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query)
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle: 'Top 3 interdisciplinary fields',
                not_found_message: "Cannot find the top 3 interdisciplinary fields.",
                result : rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}