/* global error handler */
const handleError = unreadableError => {
    let errorMessage = '';
    const errors = unreadableError.split(',');

    errors.map(error => {
        const splitedError = error.split(':');
        let newError = '';

        if (splitedError[1])
            newError = splitedError[2] ? splitedError[2].slice(1) : splitedError[1].slice(1);
        else
            newError = error;

        if (errorMessage)
            errorMessage = `${newError} | ${errorMessage}`;
        else
            errorMessage = newError;
    });

    return errorMessage;
}

/* exports */
module.exports = handleError;