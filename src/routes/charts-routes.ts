import express from 'express';
import {chartsAllowedTypes, ChartsOptions} from '../interfaces/charts-interfaces';
import {chartsParser} from '../parser/charts-parser';
import {validator} from '../utils/validator';
import {errorCodes} from "../const/error-codes";

const router = express.Router();

router.get('/:type?/:sort?/:dir?/:quantity?', (req: express.Request, res: express.Response) => {

    //Setup options
    const chartsOptions: ChartsOptions = {
        type: req.params.type || `most_popular_movies`,
        sort: req.params.sort || `place`,
        dir: req.params.dir || `asc`,
        quantity: req.params.quantity || 250
    };

    //Validation
    if(!validator.checkAllowedTypes(chartsAllowedTypes, chartsOptions, 'type', res)) return;
    if(!validator.checkAllowedTypes(chartsAllowedTypes, chartsOptions, 'sort', res)) return;
    if(!validator.checkAllowedTypes(chartsAllowedTypes, chartsOptions, 'dir', res)) return;
    if(!validator.isInteger(chartsOptions, 'quantity', res)) return;

    //Parser call
    chartsParser.getCharts(chartsOptions)
        .then((data: any) => res.status(200).json(data.charts))
        .catch((err: any) => res.status(404).json(errorCodes.operationFailed('chartsParser.getCharts',err)));

});

export {router};