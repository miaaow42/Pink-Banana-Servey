"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const Schema = mongoose_1.default.Schema;
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserSchema = new Schema({
    username: String,
    displayName: String,
    created: {
        type: Date,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    },
    updated: {
        type: Date,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    collection: "users"
});
UserSchema.plugin(passport_local_mongoose_1.default);
const Model = mongoose_1.default.model("User", UserSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map