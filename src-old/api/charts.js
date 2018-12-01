const express = require('express');
const router = express.Router();
const imdbParser = require('../imdb-parser/index');

router.get('/:type/:sort/:dir/:quantity', function (request, response) {

  var type = request.params.type || `most_popular_movies`;
  switch (type) {
    case `most_popular_tv`:
    case `top_rated_tv`:
    case `most_popular_movies`:
    case `top_rated_movies`:
      break;

    default:
      response
        .status(404)
        .json({
            "error": "Error: invalid parameter. Use one of the allowed options",
            "invalid parameter": "type",
            "allowed options": [
              'most_popular_tv',
              'top_rated_tv',
              'most_popular_movies',
              'top_rated_movies'
            ]
          }
        );
      return;
      break;
  }

  var sort = request.params.sort || `place`;
  switch (sort) {
    case `rating`:
    case `date`:
    case `place`:
      break;

    default:
      response
        .status(404)
        .json({
            "error": "Error: invalid parameter. Use one of the allowed options",
            "invalid parameter": "sort",
            "allowed options": [
              "rating",
              "date",
              "place"
            ]
          }
        );
      return;
      break;
  }

  var dir = request.params.dir || `desc`;
  switch (dir) {
    case `asc`:
    case `desc`:
      break;

    default:
      response
        .status(404)
        .json({
            "error": "Error: invalid parameter. Use one of the allowed options",
            "invalid parameter": "dir",
            "allowed options": [
              "asc",
              "desc"
            ]
          }
        );
      return;
      break;
  }

  var quantity = request.params.quantity || 250;
  if (!Number.isInteger(+quantity)) {
    response
      .status(404)
      .json({
          "error": "Error: invalid parameter. Use correct type",
          "invalid parameter": "quantity",
          "correct type": "integer"
        }
      );
    return;
  }

  imdbParser.getFilms(type, sort, dir, quantity)
    .then(function (films) {
      response.status(200).json(films.trending);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.getFilms failed. Details: " + error);
    });

});

module.exports = router;