"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const Controller_1 = require("../Controller");
router.get('/', Controller_1.DisplayHomePage);
module.exports = router;
//# sourceMappingURL=index.js.map