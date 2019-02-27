"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFailure = (res, error, status) => {
    res.status(error && error.status ? error.status : status);
    res.type('application/json');
    res.send(error);
};
exports.sendSuccess = (res, message) => {
    res.status(200);
    res.type('application/json');
    res.send(message);
};
function sendPromiseResult(res, message) {
    message.then((result) => {
        // console.log('sendPromiseResult.ok', result);
        exports.sendSuccess(res, result);
    }).catch((err) => {
        console.log('sendPromiseResult.err', err);
        exports.sendFailure(res, err, 500);
    });
}
exports.sendPromiseResult = sendPromiseResult;
function sendPromiseLikeResult(res, message) {
    message.then((result) => {
        // console.log('sendPromiseLikeResult.ok', result);
        exports.sendSuccess(res, result);
    });
}
exports.sendPromiseLikeResult = sendPromiseLikeResult;
//# sourceMappingURL=response.js.map