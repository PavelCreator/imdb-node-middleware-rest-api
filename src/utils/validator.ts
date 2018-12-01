import express from 'express';
import {errorCodes} from "../const/error-codes";

export const validator = {
    checkAllowedTypes: (
        allowedTypes: any,
        options: any,
        field: string,
        res: express.Response
    ) => {
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
    },

    isInteger: (
        options: any,
        field: string,
        res: express.Response
    ) => {
        if (!Number.isInteger(+options[field])) {
            res
                .status(404)
                .json({
                        "error": errorCodes.invalidParam.useCorrectType,
                        "invalid parameter": field,
                        "correct type": "integer"
                    }
                );
            return false;
        } else {
            return true;
        }
    }

};

