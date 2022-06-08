const { pool } = require('../utils/database');

exports.getOrganizationsLastTwo = (req,res) => {
    var sql_query = "SELECT v.name, concat(v.year_, '-', v.year_+1) as years, v.nop from two_years v\n" +
    "join two_years v2 on v.nop=v2.nop\n"+
    "where v.org_id<>v2.org_id \n"+
        "and v.nop>10 order by v.nop" ;

    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query, req.query.field)
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle: 'Query 3.4',
                not_found_message: "No organization with the same number of projects in two consecutive years and 10 projects per year.",
                result : rows, 
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}
