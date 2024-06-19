// Dependencies
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({});
const path = require('path');

//Express run
const app = express();
const PORT = process.env.PORT || 3001;

//Handlebars run
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());     
app.use(express.urlencoded({ extended: false })); //Dont know whether to put true or false
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));

//starts server to listen on port
sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});