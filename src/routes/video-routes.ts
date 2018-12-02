import express from 'express';
import {videoAllowedTypes, VideoOptions} from '../interfaces/video-interfaces';
import {videoParser} from '../parser/video-parser';
import {validator} from '../utils/validator';
import {errorCodes} from "../const/error-codes";

const router = express.Router();

router.get('/:id/:level?', (req: express.Request, res: express.Response) => {

    //Setup options
    const videoOptions: VideoOptions = {
        id: req.params.id,
        level: req.params.level || 'full'
    };

    //Validation
    if(!validator.isRequired(videoOptions, 'id', res)) return;
    if(!validator.isType(videoOptions, 'id', 'string', res)) return;
    if(!validator.checkAllowedTypes(videoAllowedTypes, videoOptions, 'level', res)) return;

    //Parser call
    videoParser.getVideo(videoOptions)
        .then((video: any) => res.status(200).json(video))
        .catch((err: any) => res.status(404).json(errorCodes.operationFailed('videoParser.getVideo', err)));

});

export {router};