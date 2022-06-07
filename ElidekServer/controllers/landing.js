
/* Controller to render main page */
exports.getMainPage = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    res.render('main_page', {
        pageTitle: 'Home',
        messages
    })
  

    
}