const Soda = require ('../models/Soda');

const fs = require('fs');

exports.createSoda = (req, res, next) => {
    // const sodaObject = JSON.parse(req.body.beer);
    const sodaObject = req.body;
    delete sodaObject._id;
     const soda = new Soda({
        ...sodaObject,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
     });
     soda.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré avec succès !' }))
        .catch(error => res.status(400).json({ error }));
  };

exports.getAllSodas = (req, res, next) => {
Soda.find()
   .then(sodas => res.status(200).json(sodas))
   .catch(error => res.status(400).json({ error }));
};

exports.getOneSoda = (req, res, next) => {
   Soda.findOne({ _id: req.params.id })
      .then(soda => res.status(200).json(soda))
      .catch(error => res.status(404).json({ error }));
};

// exports.modifySoda = (req, res, next) => {
//    const sodaObject = req.file ? {
//       ...JSON.parse(req.body.beer),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//    } : { ...req.body };

//    Beer.updateOne({ _id: req.params.id }, { ...sodaObject, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Produit modifié avec succès !'}))
//       .catch(error => res.status(400).json({ error }));
// };

// exports.deleteBeer = (req, res, next) => {
//    Beer.findOne({ _id: req.params.id})
//       .then(beer => {
//          const filename = beer.imageUrl.split('/images/')[1];
//          fs.unlink(`images/${filename}`, () => {
//             Beer.deleteOne({ _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Votre bière a été supprimée avec succès !'}))
//             .catch(error => res.status(400).json({ error }));
//          });
//       })
//       .catch(error => res.status(500).json({ error }));
//  };