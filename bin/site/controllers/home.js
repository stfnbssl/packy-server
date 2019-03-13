"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HomeController {
    constructor() {
        this.path = '';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`/`, this.home);
        };
        this.home = async (request, response) => {
            response.render('index.html.ittf', { title: 'Site Home' });
        };
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.js.map