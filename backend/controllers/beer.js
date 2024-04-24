const Beer = require ('../models/Beer');

exports.createBeer = (req, res, next) => {
    const beerObject = req.body;
    delete beerObject._id;
     const beer = new Beer({
        ...beerObject,
        likes: 0,
        dislikes: 0
     });
     beer.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré avec succès !' }))
        .catch(error => res.status(400).json({ error }));
  };

exports.getAllBeers = (req, res, next) => {
Beer.find()
   .then(beers => res.status(200).json(beers))
   .catch(error => res.status(400).json({ error }));
};

exports.getOneBeer = (req, res, next) => {
   Beer.findOne({ _id: req.params.id })
      .then(beer => res.status(200).json(beer))
      .catch(error => res.status(404).json({ error }));
};