"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayHomePage = void 0;
const user_1 = require("./user");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, user_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
//# sourceMappingURL=index.js.map