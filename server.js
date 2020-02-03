const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')

const app = express();

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Adding body parser
app.use(expressValidator());

// Set db
require('./data/reddit-db');

//Controllers
require('./controllers/posts.js')(app);



//Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
});


app.listen(3000, () => {
    console.log('Reddit listening on localhost:3000')
});