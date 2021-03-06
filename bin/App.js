"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
class App {
    constructor(initValues) {
        this.config = initValues.config;
        this.port = this.config.port;
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        initValues.middlewares.forEach((middleware) => {
            middleware(this.app);
        });
        initValues.controllers.forEach((controller) => {
            console.log('installing router on path: ', controller.path);
            controller.initialize(initValues);
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map