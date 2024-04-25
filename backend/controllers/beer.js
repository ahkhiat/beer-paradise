const Beer = require ('../models/Beer');

const fs = require('fs');

exports.createBeer = (req, res, next) => {
    const beerObject = JSON.parse(req.body.beer);
    delete beerObject._id;
     const beer = new Beer({
        ...beerObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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

exports.modifyBeer = (req, res, next) => {
   const beerObject = req.file ? {
      ...JSON.parse(req.body.beer),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };

   Beer.updateOne({ _id: req.params.id }, { ...beerObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Produit modifié avec succès !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteBeer = (req, res, next) => {
   Beer.findOne({ _id: req.params.id})
      .then(beer => {
         const filename = beer.imageUrl.split('/images/')[1];
         fs.unlink(`images/${filename}`, () => {
            Beer.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre bière a été supprimée avec succès !'}))
            .catch(error => res.status(400).json({ error }));
         });
      })
      .catch(error => res.status(500).json({ error }));
 };