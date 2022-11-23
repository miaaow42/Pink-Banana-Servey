"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const Schema = mongoose_1.default.Schema;
const QuestionSchema = new Schema({
    questionText: String,
    questionType: String,
    survey_id: String,
    first_Choice: String,
    second_Choice: String,
    third_Choice: String,
    fourth_Choice: String,
    option_Text: String,
    created: {
        type: String,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    collection: "question"
});
const Model = mongoose_1.default.model("QuestionList", QuestionSchema);
exports.default = Model;
//# sourceMappingURL=question.js.map