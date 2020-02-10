const User = require('../models/user');


module.exports = (app) => {

    //Signup form
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });

    //Signup POST
    app.post('/sign-up', (req, res) => {
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    
};