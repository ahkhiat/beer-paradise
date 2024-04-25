const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


mongoose.connect('mongodb+srv://ahkhiat:Afpa2024@cluster0.l3uiknn.mongodb.net/db_test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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