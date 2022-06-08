const { pool } = require('../utils/database');


exports.getCreateForm = (req, res) => {
    //console.log(req.query);
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
    else if (table_name == 'evaluation'){
        res.render('create/evaluation.ejs', {
            pageTitle : 'Insert Evaluation',
        });
    }
    else if (table_name == 'works'){
        res.render('create/works.ejs', {
            pageTitle : 'Insert Work Relation',
        });
    }
    else if (table_name == 'Program'){
        res.render('create/program.ejs', {
            pageTitle : 'Insert Program',
        });
    }
    else if (table_name == 'executive'){
        res.render('create/executive.ejs', {
            pageTitle : 'Insert Executive',
        });
    }
    else if (table_name == 'organization'){
        res.render('create/organization.ejs', {
            pageTitle : 'Insert Organization',
        });
    }
    else if(table_name =='researcher'){
        pool.getConnection((err, conn) => {
            conn.promise().query("select max(org_id) as max_organization_id from organization")
            .then(([rows, fields]) => {
                res.render('create/researcher.ejs',{
                    pageTitle : 'Insert Researcher',
                    max_organization_id : rows[0].max_organization_id
                })
            })
            .then(() => pool.releaseConnection(conn))
            .catch(err => console.log(err))
        })
    }

    else if(table_name =='telephones'){
        pool.getConnection((err, conn) => {
            conn.promise().query("select max(org_id) as max_organization_id from organization")
            .then(([rows, fields]) => {
                res.render('create/telephone.ejs',{
                    pageTitle : 'Insert Telephone',
                    max_organization_id : rows[0].max_organization_id
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

function insert_organization(req, res){
    var sql_script = "insert into organization (name, Postal_code, Street_Name, Street_Number, City, budget_Ministry, budget_Priv, budget_Equity) values (?,?,?,?,?,?,?,?)";

    let name = req.body.name;
    let pc = req.body.Postal_code;
    let strname = req.body.Street_Name;
    let strnum = req.body.Street_Number;
    let city = req.body.City;
    let bm = req.body.budget_Ministry;
    let bp = req.body.budget_Priv;
    let be = req.body.budget_Equity;

    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [name, pc, strname, strnum, city, bm, bp, be])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Organization!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Organization could not be added." })
            res.redirect('/');
        })
    })
}

function insert_executive(req, res){
    var sql_script = "insert into Executive (name) values (?)";

    let name = req.body.name;

    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [name])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Executive!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Executive could not be added." })
            res.redirect('/');
        })
    })
}

function insert_works(req, res){
    var sql_script = "insert into works (researcher_id, project_id) values (?,?)";

    let r = req.body.researcher_id;
    let p = req.body.project_id;


    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [r,p])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Work Relation!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Work Relation could not be added." })
            res.redirect('/');
        })
    })
}

function insert_researcher(req, res){
    var sql_script = "insert into researcher (Name, Last_Name, Gender, BirthDate, start_date, organization_id) values (?,?,?,?,?,?)";

    let name = req.body.Name;
    let last_name = req.body.last_name;
    let birthdate = req.body.birthdate;
    let gender = req.body.gender;
    let start_date = req.body.start_date;
    let org_id = req.body.organization_id;

    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [name,last_name,gender,birthdate,start_date,org_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Researcher!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Researcher could not be added." })
            res.redirect('/');
        })
    })
}

function insert_telephone(req, res){
    var sql_script = "insert into telephones(number, org_id) values (?,?)";

    let num = req.body.num;
    let org_id = req.body.org_id;

    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [num,org_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Telephone!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Telephone could not be added." })
            res.redirect('/');
        })
    })
}

function insert_evaluation(req,res){
    var sql_script = "insert into evaluation ( Grade, Date) values (?,?)";

    let grade = req.body.Grade;
    let date = req.body.date;

    pool.getConnection((err, conn) =>{
        conn.promise().query(sql_script, [grade, date])
        .then(()=>{
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Evaluation!" })
            res.redirect('/');
        })
        .catch(err =>{
            req.flash('messages', { type: 'error', value: "Something went wrong, Evaluation could not be added." })
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
    else if(table_name == 'organization'){
        insert_organization(req,res)
    }
    else if(table_name == 'executive'){
        insert_executive(req,res)
    }
    else if(table_name == 'Program'){
        insert_program(req,res)
    }
    else if(table_name == 'works'){
        insert_works(req,res)
    }
    else if(table_name == 'Evaluation'){
        insert_evaluation(req,res)
    }
    else if(table_name == 'researcher'){
        insert_researcher(req,res)
    }
    else if(table_name == 'telephones'){
    insert_telephone(req, res)
    }
    else {
        req.flash('messages', { type: 'warning', value: `Insertion in ${table_name} is not yet implemented.` })
        res.redirect('/');
    }
}
