const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();



mongoose.connect(process.env.MONGODB_PATH)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet({
    crossOriginResourcePolicy: false,
 }));

app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const userRoutes = require('./routes/users');
app.use('/api/auth', userRoutes);

const beerRoutes = require('./routes/beers');
app.use('/api/beers', beerRoutes);

const sodaRoutes = require('./routes/sodas');
app.use('/api/sodas', sodaRoutes);

 
module.exports = app;