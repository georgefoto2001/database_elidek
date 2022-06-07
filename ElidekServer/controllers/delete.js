const { pool } = require('../utils/database');


function convert_to_date(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

exports.postDeleteDeliverable = (req, res) =>{

    var sql_script = "delete from Deliverable where projectid =? and Title=? and date=? and Description=?";
    
    pool.getConnection((err, conn) => {
        conn.promise().query(sql_script, [req.query.project_id, req.query.Title, convert_to_date(req.query.date), req.query.Description])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a Deliverable!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Deliverable could not be deleted." })
            res.redirect('/');
        })
    })
}