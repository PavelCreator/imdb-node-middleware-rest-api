const prefix = {
    errorInvalidParam: 'Error: invalid parameter. '
}

const errorCodes = {
    invalidParam: {
        useAllowedOptions: prefix.errorInvalidParam + 'Use one of the allowed options',
        useCorrectType: prefix.errorInvalidParam + 'Use correct type'
    }
}

export {errorCodes};