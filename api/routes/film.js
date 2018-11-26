const express = require('express');
const router = express.Router();
const imdb = require('./../imdb-parser');

router.get('/:level/:id', function (request, response) {

  var filmId = request.params.id;
  if (!filmId) {
    response.status(404).json("Error: specify film id. For example: /film/tt1825683");
    return;
  }

  var level = request.params.level;

  switch (level) {
    case 'basic':
      imdb.scrapper(filmId)
        .then(function (filmData) {
          response.status(200).json(filmData);
        })
        .catch(function (error) {
          response.status(404).json("Error: imdb.scrapper failed. Details: " + error);
        });
      break;

    case 'awards':
      imdb.awardsPage(filmId)
        .then(function (filmData) {
          response.status(200).json(filmData);
        })
        .catch(function (error) {
          response.status(404).json("Error: imdb.awardsPage failed. Details: " + error);
        });
      break;

    case 'full':
      imdb.getFull(filmId)
        .then(function (filmData) {
          response.status(200).json(filmData);
        })
        .catch(function (error) {
          response.status(404).json("Error: imdb.getFull failed. Details: " + error);
        });
      break;

    default:
      response.status(404).json("Error: invalid level field. Please use 'basic', 'awards' or 'full'");
      break;
  }

});

module.exports = router;