// Dependencies
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//starts server to listen on port
sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});