const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const chalk = require("chalk");
require('custom-env').env('local');


const app = express();
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(chalk.green(`🚀 Server running on port ${port}!`));
    console.log(chalk.blue(`Visit: http://localhost:${port}/`));
});

/* ROUTES and how to import routes */

const landing = require('./routes/landing');
const project = require('./routes/project');
const field = require('./routes/field');
const organizations = require('./routes/organizations');
const relates = require('./routes/relates');
const researchers = require('./routes/researchers');
const executives = require('./routes/executives');
const create = require('./routes/create');
const show = require('./routes/show');
const update_delete = require('./routes/update_delete');
const update = require('./routes/update');
const delete_route = require('./routes/delete');
/* end of ROUTES and how to import routes */


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(flash());

app.use(session({
    secret: "ThisShouldBeSecret",
    resave: false,
    saveUninitialized: false
}));


/* Routes used by the project */
app.use('/',landing);
app.use('/project',project);
app.use('/field',field);
app.use('/organizations',organizations);
app.use('/relates',relates);
app.use('/researchers',researchers);
app.use('/executives',executives);
app.use('/create',create);
app.use('/show',show);
app.use('/update_delete', update_delete);
app.use('/update',update);
app.use('/delete',delete_route);
app.use((req, res, next) => { res.status(404).render('404.ejs', { pageTitle: '404' }) })
