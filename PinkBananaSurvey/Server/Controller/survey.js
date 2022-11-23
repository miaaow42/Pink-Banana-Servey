"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessExportSurveyPage = exports.DisplayExportSurveyPage = exports.ProcessTakeSurveyPage = exports.DisplayTakeSurveyPage = exports.ProcessDeleteSurveyPage = exports.ProcessAddSurveyPage = exports.DisplayAddSurveyPage = exports.DisplayAllSurveyListPage = exports.DisplaySurveyListPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
const response_1 = __importDefault(require("../Models/response"));
const user_1 = require("./user");
const moment_1 = __importDefault(require("moment"));
function DisplaySurveyListPage(req, res, next) {
    if (!req.user) {
        surveys_1.default.find((err, surveyCollection) => {
            res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });
        });
    }
    else {
        if (req.user.username === 'admin') {
            surveys_1.default.find((err, surveyCollection) => {
                question_1.default.find((err, questionCollection) => {
                    response_1.default.find((err, responseCollection) => {
                        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, list2: questionCollection, list3: responseCollection, displayName: (0, user_1.UserDisplayName)(req) });
                    });
                });
            });
        }
        else {
            surveys_1.default.find({ user_id: req.user.id }, {}, {}, (err, surveyCollection) => {
                question_1.default.find((err, questionCollection) => {
                    response_1.default.find((err, responseCollection) => {
                        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, list2: questionCollection, list3: responseCollection, displayName: (0, user_1.UserDisplayName)(req) });
                    });
                });
            });
        }
    }
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
function DisplayAllSurveyListPage(req, res, next) {
    let dateNow = (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD');
    surveys_1.default.find({ start_Date: { $lte: dateNow }, end_Date: { $gte: dateNow } }, (err, surveyCollection) => {
        res.render('index', { title: 'Surveys you can take now', page: 'survey-list-all', list: surveyCollection, displayName: (0, user_1.UserDisplayName)(req), dateNow: dateNow });
    });
}
exports.DisplayAllSurveyListPage = DisplayAllSurveyListPage;
;
function DisplayAddSurveyPage(req, res, next) {
    res.render('index', { title: 'Create Survey', page: 'update-survey', list: '', author: req.user.username, displayName: (0, user_1.UserDisplayName)(req) });
}
exports.DisplayAddSurveyPage = DisplayAddSurveyPage;
function ProcessAddSurveyPage(req, res, next) {
    let newSurvey = new surveys_1.default({
        title: req.body.name,
        author: req.user.username,
        user_id: req.user.id
    });
    console.log(newSurvey);
    surveys_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    res.redirect('/date');
}
exports.ProcessAddSurveyPage = ProcessAddSurveyPage;
function ProcessDeleteSurveyPage(req, res, next) {
    let id = req.params.id;
    question_1.default.deleteMany({ survey_id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    surveys_1.default.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessDeleteSurveyPage = ProcessDeleteSurveyPage;
function DisplayTakeSurveyPage(req, res, next) {
    let id = req.params.id;
    question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd, displayName: (0, user_1.UserDisplayName)(req) });
    });
}
exports.DisplayTakeSurveyPage = DisplayTakeSurveyPage;
function ProcessTakeSurveyPage(req, res, next) {
    let responseJson = JSON.stringify(req.body, null, 2);
    let newResponse = new response_1.default({
        survey_id: req.params.id,
        question: {
            option: responseJson
        }
    });
    console.log(req.body);
    console.log("---------------------------------");
    response_1.default.create(newResponse, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessTakeSurveyPage = ProcessTakeSurveyPage;
function DisplayExportSurveyPage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.find({ _id: id }, {}, {}, (err, surveyCollection) => {
        question_1.default.find({ survey_id: id }, {}, {}, (err, questionCollection) => {
            response_1.default.find({ survey_id: id }, {}, {}, (err, responseCollection) => {
                res.render("index", {
                    title: "Survey List",
                    page: "export",
                    list: surveyCollection,
                    list2: questionCollection,
                    list3: responseCollection,
                    displayName: (0, user_1.UserDisplayName)(req),
                });
            });
        });
    });
}
exports.DisplayExportSurveyPage = DisplayExportSurveyPage;
function ProcessExportSurveyPage(req, res, next) {
    console.log("hello");
}
exports.ProcessExportSurveyPage = ProcessExportSurveyPage;
//# sourceMappingURL=survey.js.map