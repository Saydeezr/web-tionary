// Dependencies
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


//Express run
const app = express();
const PORT = process.env.PORT || 3001;

//Sessions setup
app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true
}));

//Handlebars run
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());     
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers'));

//starts server to listen on port
sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});