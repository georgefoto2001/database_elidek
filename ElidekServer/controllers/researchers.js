const { pool } = require('../utils/database');

exports.get_young_researchers = (req, res) => {
    var sql_query = "SELECT r.Name, r.Last_Name, count(w.researcher_id) as cnt FROM researcher r\n"+
    "JOIN works w ON w.researcher_id = r.researcher_id join Project p ON p.project_id = w.project_id\n"+
    "WHERE r.age<40 AND p.start_date IS NOT NULL AND (p.end_date IS NULL OR p.end_date > NOW())\n"+
    "GROUP BY w.researcher_id";

    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query)
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle: 'Young researchers',
                not_found_message: "Cannot find any young researcher in active projects",
                result : rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })


}


exports.get_researchers_no_delivery = (req, res) => {
    var sql_query = "SELECT r.name, r.Last_Name, count(w.project_id) as num_projects FROM researcher r\n"+
    "JOIN works w ON w.researcher_id = r.researcher_id\n"+
    "JOIN Project p ON p.project_id = w.project_id\n"+
    "WHERE p.project_id NOT IN( SELECT p.project_id FROM Project p JOIN Deliverable d ON p.project_id = d.projectid)\n"+
    "GROUP BY w.project_id HAVING count(w.project_id)>4";

    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query)
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle: 'Researcher in no deliverable projects',
                not_found_message: "All researchers work in at most 4 projects with delivery date.",
                result : rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}