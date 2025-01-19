    const { constant } = require("../constant");

    const errorHandler = (err, req, res, next) => {
        const statusCode = res.statusCode === 200 ? constant.SERVER : res.statusCode;
        const errorResponse = {
            title: "",
            message: err.message,
            stackTrace: err.stack
        };

        switch (statusCode) {
            case constant.NOT_FOUND:
                errorResponse.title = "Error Not Found";
                res.status(statusCode).json(errorResponse);
                break;
            case constant.FORBIDDEN:
                errorResponse.title = "Error Forbidden";
                res.status(statusCode).json(errorResponse);
                break;
            case constant.UNAUTHORIZED:
                errorResponse.title = "Error Unauthorized";
                res.status(statusCode).json(errorResponse);
                break;
            case constant.VALIDATION_ERROR:
                errorResponse.title = "Validation Error";
                res.status(statusCode).json(errorResponse);
                break;
            case constant.SERVER:
                errorResponse.title = "Server Error";
                res.status(statusCode).json(errorResponse);
                break;
            default:
                console.log("Everything OK!")
                res.status(200)
                next()
                break
        }
    }

    module.exports = errorHandler;