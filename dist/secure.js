"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secure = void 0;
const secure = () => (req, res, next) => {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) ||
        ((_b = req.session) === null || _b === void 0 ? void 0 : _b.cookie.expires).getTime() < new Date().getTime()) {
        return res.status(401).send();
    }
    return next();
};
exports.secure = secure;
