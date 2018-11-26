const express = require('express');
const router = express.Router();
const imdb = require('imdb-scrapper');

router.get('/:quantity', function (request, response) {

  var quantity = request.params.quantity || 250;

  imdb.getTrending([quantity])
    .then(function (films) {
      response.status(200).json(films.trending);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.getTrending failed. Details: " + error);
    });

});

module.exports = router;