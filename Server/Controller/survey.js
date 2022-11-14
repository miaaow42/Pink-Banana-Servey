"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayUpdateSurveyPage = exports.ProcessDeleteSurveyPage = exports.ProcessAddSurveyPage = exports.DisplayAddSurveyPage = exports.DisplaySurveyListPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
function DisplaySurveyListPage(req, res, next) {
    surveys_1.default.find((err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });
    });
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
function DisplayAddSurveyPage(req, res, next) {
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: '' });
}
exports.DisplayAddSurveyPage = DisplayAddSurveyPage;
function ProcessAddSurveyPage(req, res, next) {
    let newSurvey = new surveys_1.default({
        "title": req.body.name,
        "author": req.body.author,
    });
    console.log(newSurvey);
    surveys_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(newSurvey);
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
function DisplayUpdateSurveyPage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.findById(id, {}, {}, (err, surveyToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(surveyToUpdate);
        res.render('index', { title: 'Update Survey', page: 'update-survey', list: surveyToUpdate });
    });
}
exports.DisplayUpdateSurveyPage = DisplayUpdateSurveyPage;
//# sourceMappingURL=survey.js.map