import express from 'express';
import {chartsAllowedTypes} from "../interfaces/charts-interfaces";
import {errorCodes} from "../const/error-codes";

class Validator {

    public checkAllowedTypes(
        allowedTypes: any,
        options: any,
        field: string,
        res: express.Response
    ) {
        if (!allowedTypes[field].includes(options[field])) {
            res
                .status(404)
                .json({
                        "error": errorCodes.invalidParam.useAllowedOptions,
                        "invalid parameter": field,
                        "allowed options": allowedTypes[field]
                    }
                );
            return false;
        } else {
            return true;
        }
    }

    public isInteger(
        options: any,
        field: string,
        res: express.Response
    ) {
        if (!Number.isInteger(+options[field])) {
            res
                .status(404)
                .json({
                        "error": "Error: invalid parameter. Use correct type",
                        "invalid parameter": "quantity",
                        "correct type": "integer"
                    }
                );
            return false;
        } else {
            return true;
        }
    }

};

export const validator = new Validator();