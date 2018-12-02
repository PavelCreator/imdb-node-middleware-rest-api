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
    },

    isRequired: (
        options: any,
        field: string,
        res: express.Response
    ) => {
        if (!options[field]) {
            res
                .status(404)
                .json({
                        "error": errorCodes.requiredParamMissing,
                        "invalid parameter": field
                    }
                );
            return false;
        } else {
            return true;
        }
    },

    isType: (
        options: any,
        field: string,
        type: string,
        res: express.Response
    ) => {
        let expectedType = typeof options[field];
        if (expectedType !== type) {
            res
                .status(404)
                .json({
                        "error": errorCodes.wrongParamType,
                        "invalid parameter": field,
                        "used type": type,
                        "expected type": expectedType
                    }
                );
            return false;
        } else {
            return true;
        }
    }

};

