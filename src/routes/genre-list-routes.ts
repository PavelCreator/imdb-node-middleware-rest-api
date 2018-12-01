import express from 'express';
import {genreListParser} from '../parser/genre-list-parser';
import {errorCodes} from "../const/error-codes";

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {

    //Parser call
    genreListParser.getGenres()
        .then((data: any) => res.status(200).json(data.genres))
        .catch((err: any) => res.status(404).json(errorCodes.operationFailed('genreListParser.getGenres',err)));

});

export {router};