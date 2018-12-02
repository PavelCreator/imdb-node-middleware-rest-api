const prefix = {
    errorInvalidParam: 'Error: invalid parameter. '
};

const errorCodes = {
    invalidParam: {
        useAllowedOptions: prefix.errorInvalidParam + 'Use one of the allowed options',
        useCorrectType: prefix.errorInvalidParam + 'Use correct type'
    },
    requiredParamMissing: 'Error: Required parameter missing',
    wrongParamType: 'Error: Wrong parameter type',
    operationFailed: (operationName: string, error: string) => {
        return `Error: ${operationName} failed. Details: ${error}`
    }
};

export {errorCodes};