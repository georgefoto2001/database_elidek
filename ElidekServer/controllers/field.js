const { pool } = require('../utils/database');


exports.get_field_form = (req,res) => {
    pool.getConnection((err, conn) => {

        conn.promise().query("select * from ScientificFields")
        .then(([rows, fields]) => {
            res.render('field_form',{
                pageTitle: 'Choose field',
                scientific_fields : rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

    
    
}

exports.get_field_form_result = (req,res) => {

    var sql_query = "SELECT sf.field_name, sf.project_id, sf.title, sf2.name, sf2.last_name, sf2.researcher_id " +
    "FROM(\n"+
	"(\n"+
	"SELECT ij1.project_id, ij1.title, ij2.field_name\n"+
    "FROM(\n"+
	"SELECT p.project_id, p.title FROM Project p WHERE DATEDIFF( NOW() ,p.start_date)<365 AND p.end_date IS NULL) AS ij1\n"+
	"INNER JOIN(\n"+
    "SELECT rel.field_name, rel.project_id FROM relates rel WHERE rel.field_name = ?) AS ij2 ON ij1.project_id = ij2.project_id) AS sf\n"+
    "LEFT OUTER JOIN works wap ON sf.project_id = wap.project_id LEFT OUTER JOIN(\n"+
    "SELECT r.researcher_id, r.name, r.last_name FROM researcher r ) AS sf2 ON wap.researcher_id = sf2.researcher_id)"


    pool.getConnection((err, conn) => {

        conn.promise().query(sql_query, req.query.field)
        .then(([rows, fields]) => {
            res.render('field_result',{
                pageTitle: 'Query 3.3',
                result : rows, 
                field: req.query.field
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}