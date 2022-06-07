const { pool } = require('../utils/database');


exports.getCreateForm = (req, res) => {
    var table_name = req.query.table;
    
    if (table_name == 'Deliverable') {
        pool.getConnection((err, conn) => {
            conn.promise().query("select max(Project_id) as max_project_id from Project")
            .then(([rows, fields]) => {
                res.render('create/deliverable.ejs', {
                    pageTitle : 'Insert Deliverable',
                    max_project_id: rows[0].max_project_id
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

function insert_deliverable(req, res){
    var sql_script = "insert into Deliverable (Title, Description, date, projectid) values (?,?,?,?)";

    let title = req.body.title;
    let description = req.body.description;
    let date = req.body.date;
    let project_id = req.body.project_id;

    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [title,description,date,project_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Deliverable!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Deliverable could not be added." })
            res.redirect('/');
        })
    })
}

exports.postInsert = (req, res) => {
    console.log(req.body)
    var table_name = req.params.table_name
    
    if (table_name == 'Deliverable') {
        insert_deliverable(req,res)        
    }
    else {
        req.flash('messages', { type: 'warning', value: `Insertion in ${table_name} is not yet implemented.` })
        res.redirect('/');
    }
}