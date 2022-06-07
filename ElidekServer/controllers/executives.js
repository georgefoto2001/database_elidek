const { pool } = require('../utils/database');

exports.get_top5_executives = (req,res) => {

    var sql_query = "select sum(p.cost) as cost, e.executive_id,e.name,  o.name, o.org_id\n"+
    "from Project p join Executive e on e.executive_id = p.executive_id\n"+
    "join organization o on o.org_id =p.organization_id\n"+
    "group by o.org_id order by 1 desc LIMIT 5";
    
    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query)
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle: 'Top 5 executives',
                not_found_message: "There are no top executives",
                result : rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}