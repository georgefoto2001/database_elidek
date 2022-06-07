const { pool } = require('../utils/database');

function convert_to_date(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

function updateDeliverable(old_tuple, new_tuple,req,res){

    var sql_script = "update Deliverable  set Title=? , date=?, Description=?\n"+
    "where projectid=? and Title=? and date=? and Description=?";
    console.log(old_tuple);
    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [new_tuple.Title, new_tuple.date_in, new_tuple.Description,
            old_tuple.porjectid,old_tuple.title,convert_to_date(old_tuple.date),old_tuple.descritpion
            
        ])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated a Deliverable!" })
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
            req.flash('messages', { type: 'error', value: "Something went wrong, Deliverable could not be updated." })
            res.redirect('/');
        })
    })
}

exports.postUpdate = (req,res) => {

    var table_name = req.params.table_name;
    var old_tuple = req.query;
    var new_tuple = req.body;
   
    if (table_name == 'Deliverable') {
        updateDeliverable(old_tuple, new_tuple, req, res)
    }
    else {
        req.flash('messages', { type: 'warning', value: `Insertion in ${table_name} is not yet implemented.` })
        res.redirect('/');
    }
}