const { pool } = require('../utils/database');

exports.get_condition_form = (req, res, next) => {

    res.render('query_3_1', {
        pageTitle: 'Query 3.1',
    });    
}

/**
 * Dynamically generates where clause for SQL based on params.
 * It only works for query 3.1
 */
function build_conditions(params) {
    var conditions = [];
    var values = [];
      
    if (params.start_date !== '') {
      conditions.push("start_date>=?");
      values.push(params.start_date);
    }
  
    if (params.duration !== '') {
      conditions.push("Duration = ?");
      values.push(parseInt(params.duration));
    }

    if (params.exec_id !== '') {
        conditions.push("executive_id = ?");
        values.push(parseInt(params.exec_id));
    }
    // console.log(conditions);
    // console.log(conditions.join(' AND '));
    // console.log(values);

    return {
      conditions: conditions.length ?
               conditions.join(' AND ') : '1',
      values: values
    };
  }

exports.get_projects_of_cond = (req, res, next) => { 
    
  pool.getConnection((err, conn) => {
      
    let where_clause = build_conditions(req.query);
    console.log(where_clause.conditions);
    let sql_query = "select program_id ,Name as prog_name ,project_id, title, Duration, start_date, executive_id\n"+
    "from Program natural join Project where " + where_clause.conditions;
    
    conn.promise().query(sql_query, where_clause.values)
    .then(([rows, fields]) => {
        res.render('query_3_1_show_result',{
            pageTitle : 'Result of Query 3.1',
            result : rows,
            conditions: req.query
        });
    })
    .then(() => pool.releaseConnection(conn))
    .catch(err => console.log(err))
  })
    
}

exports.get_researchers_of_project = (req, res, next) => {
    let project_id = req.params.project_id;

    pool.getConnection((err, conn) => {
        let sql_query = "select r.researcher_id,Name, Last_Name, r.organization_id\n"+ 
        "from Project natural join works join researcher r on works.researcher_id = r.researcher_id\n"+
        "where project_id=?"
        
        conn.promise().query(sql_query, [project_id])
        .then(([rows, fields]) => {
            res.render('project_researchers',{
                pageTitle : 'Researchers of project with ID:'+project_id,
                result : rows,
                project_id: project_id
            });
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
      })

}

exports.get_projects_by_researcher = (req, res) =>{
    pool.getConnection((err, conn) => {

        conn.promise().query("select * from view_project_by_researcher")
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle : 'Query 3.2 A',
                not_found_message : "No projects by researher",
                result : rows,
            });
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}

exports.get_projects_by_org = (req, res)=>{
    pool.getConnection((err, conn) => {

        conn.promise().query("select * from project_by_organization")
        .then(([rows, fields]) => {
            res.render('show_results',{
                pageTitle : 'Query 3.2 B',
                not_found_message : "No projects by organization.",
                result : rows,
            });
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}