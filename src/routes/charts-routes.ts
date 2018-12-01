import express from 'express';
import { ChartsOptions } from '../interfaces/charts-interfaces';
import { chartsParser } from '../parser/charts-parser';
const router = express.Router();

router.get('/:type/:sort/:dir/:quantity', (req: express.Request, res: express.Response) => {

  const type = req.params.type || `most_popular_movies`;
  switch (type) {
    case `most_popular_tv`:
    case `top_rated_tv`:
    case `most_popular_movies`:
    case `top_rated_movies`:
      break;

    default:
      res
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
  }

  const sort = req.params.sort || `place`;
  switch (sort) {
    case `rating`:
    case `date`:
    case `place`:
      break;

    default:
      res
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
  }

  const dir = req.params.dir || `desc`;
  switch (dir) {
    case `asc`:
    case `desc`:
      break;

    default:
      res
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
  }

  const quantity = req.params.quantity || 250;
  if (!Number.isInteger(+quantity)) {
    res
      .status(404)
      .json({
          "error": "Error: invalid parameter. Use correct type",
          "invalid parameter": "quantity",
          "correct type": "integer"
        }
      );
    return;
  }

  const chartsOptions = {
      type,
      sort,
      dir,
      quantity
  };

  chartsParser.getCharts(chartsOptions)
    .then((films:any) => res.status(200).json(films.trending))
    .catch((error:any) => res.status(404).json("Error: imdb.getFilms failed. Details: " + error));

});

export {router};