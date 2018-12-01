const express = require('express');
const router = express.Router();
const imdb = require('../imdb-parser/index');

router.get('/:name', function (request, response) {

  const name = request.params.name;

  if (!name) {
    response.status(404).json("Error: specify actor name. For example: /actor/Tom Hanks");
  }

  imdb.searchActor(name)
    .then(function (actors) {

      function sameName(actor) {
        return actor.actorName === name;
      }

      const actor = actors.find(sameName);

      if (!actor) {
        response.status(404).json("Error: actor name not found");
        return;
      }

      const actorId = actor.actorId;

      imdb.getActor(actorId)
        .then(function (actor) {
          console.log('actor =', actor);
          response.status(200).json(actor);
        })
        .catch(function (error) {
          response.status(400).json("Error: imdb.getActor failed. Details: " + error);
        });

    })
    .catch(function (error) {
      response.status(400).json("Error: imdb.searchActor failed. Details: " + error);
    });

});

module.exports = router;