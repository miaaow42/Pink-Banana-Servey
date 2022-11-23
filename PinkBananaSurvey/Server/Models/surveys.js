"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const Schema = mongoose_1.default.Schema;
const SurveySchema = new Schema({
    title: String,
    author: String,
    user_id: String,
    start_Date: String,
    end_Date: String,
    isActive: Boolean,
    questionText: String,
    created: {
        type: String,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    },
    updated: {
        type: String,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    collection: "survey"
});
const Model = mongoose_1.default.model("SurveyList", SurveySchema);
exports.default = Model;
//# sourceMappingURL=surveys.js.map