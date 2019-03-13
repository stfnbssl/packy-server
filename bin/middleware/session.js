"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const mongoSessionStore = require("connect-mongo");
const mongoose = require("mongoose");
const config_1 = require("../features/config");
exports.SessionMiddleware = (app) => {
    const MongoStore = mongoSessionStore(session);
    const cookieOptions = {
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false,
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
    };
    const sessionOptions = {
        name: 'packy-backend.sid',
        secret: config_1.config.sessionSecret,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 14 * 24 * 60 * 60,
        }),
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: false
    };
    /*
    if (!dev) {
        server.set('trust proxy', 1); // trust first proxy
    }
    */
    app.use(session(sessionOptions));
};
//# sourceMappingURL=session.js.map