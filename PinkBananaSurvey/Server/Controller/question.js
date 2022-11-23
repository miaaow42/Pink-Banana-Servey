"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDatePage = exports.DisplayDatePage = exports.ProcessDeleteQuestionPage = exports.ProcessUpdateQuestionPage = exports.DisplayUpdateQuestionPage = exports.ProcessAddTFQuestionPage = exports.DisplayAddTFQuestionPage = exports.ProcessAddMCQuestionPage = exports.DisplayAddMCQuestionPage = exports.ProcessQuestionPage = exports.DisplayQuestionPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
const user_1 = require("./user");
function DisplayQuestionPage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.findById(id, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd2) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index', { title: 'Question', page: 'question', list: questionToAdd, list2: questionToAdd2, displayName: (0, user_1.UserDisplayName)(req) });
        });
    });
}
exports.DisplayQuestionPage = DisplayQuestionPage;
function ProcessQuestionPage(req, res, next) {
    let id = req.params.id;
    let updatedSurveyList = new surveys_1.default({
        "_id": id,
        "title": req.body.name,
        "author": req.body.author,
        "start_Date": req.body.startDate,
        "end_Date": req.body.endDate
    });
    if (req.body.questionText != null) {
        let newQuestion = new question_1.default();
        if (req.body.firstChoice == null) {
            newQuestion = new question_1.default({
                "questionText": req.body.questionText,
                "questionType": "True/False",
                "survey_id": id
            });
        }
        else {
            newQuestion = new question_1.default({
                "questionText": req.body.questionText,
                "questionType": "Multiple Choice",
                "first_Choice": req.body.firstChoice,
                "second_Choice": req.body.secondChoice,
                "third_Choice": req.body.thirdChoice,
                "fourth_Choice": req.body.fourthChoice,
                "survey_id": req.params.id
            });
        }
        ;
        question_1.default.create(newQuestion, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
        });
    }
    surveys_1.default.updateOne({ _id: id }, updatedSurveyList, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    res.redirect('/question/' + id);
}
exports.ProcessQuestionPage = ProcessQuestionPage;
function DisplayAddMCQuestionPage(req, res, next) {
    let id = req.params.id;
    question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Add Multiple Choice Question', page: 'update-question-mc', list: questionToAdd, id: id, displayName: (0, user_1.UserDisplayName)(req) });
    });
}
exports.DisplayAddMCQuestionPage = DisplayAddMCQuestionPage;
function ProcessAddMCQuestionPage(req, res, next) {
    let id = req.params.id;
    let newQuestion = new question_1.default({
        "questionText": req.body.questionText,
        "questionType": "Multiple Choice",
        "survey_id": req.params.id,
        "first_Choice": req.body.firstChoice,
        "second_Choice": req.body.secondChoice,
        "third_Choice": req.body.thirdChoice,
        "fourth_Choice": req.body.fourthChoice
    });
    question_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/question/' + req.params.id);
    });
}
exports.ProcessAddMCQuestionPage = ProcessAddMCQuestionPage;
function DisplayAddTFQuestionPage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    surveys_1.default.findById(id, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);
        question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd2) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index', { title: 'Add True or False Question', page: 'update-question-tf', list: questionToAdd, list2: questionToAdd2, displayName: (0, user_1.UserDisplayName)(req) });
        });
    });
}
exports.DisplayAddTFQuestionPage = DisplayAddTFQuestionPage;
function ProcessAddTFQuestionPage(req, res, next) {
    let id = req.params.id;
    let newQuestion = new question_1.default({
        "questionText": req.body.questionText,
        "questionType": "True/False",
        "survey_id": req.params.id
    });
    console.log(id);
    question_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/question/' + req.params.id);
    });
}
exports.ProcessAddTFQuestionPage = ProcessAddTFQuestionPage;
function DisplayUpdateQuestionPage(req, res, next) {
    let id = req.params.id;
    question_1.default.findById(id, {}, {}, (err, questionToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(questionToUpdate);
        let surveyId = JSON.stringify(questionToUpdate, ['questionType']).substr(17, 10);
        console.log(surveyId);
        if (surveyId == "True/False") {
            res.render('index', { title: 'Update Question', page: 'update-question-tf', list2: questionToUpdate, displayName: (0, user_1.UserDisplayName)(req) });
        }
        else if (surveyId == "Multiple C") {
            res.render('index', { title: 'Update Question', page: 'update-question-mc', list: questionToUpdate, displayName: (0, user_1.UserDisplayName)(req) });
        }
        else {
            res.render('index', { title: 'Update Question', page: 'update-question-sa', list2: questionToUpdate, displayName: (0, user_1.UserDisplayName)(req) });
        }
    });
}
exports.DisplayUpdateQuestionPage = DisplayUpdateQuestionPage;
function ProcessUpdateQuestionPage(req, res, next) {
    let id = req.params.id;
    let updatedQuestionList = new question_1.default({
        "_id": id,
        "questionText": req.body.questionText,
        "first_Choice": req.body.firstChoice,
        "second_Choice": req.body.secondChoice,
        "third_Choice": req.body.thirdChoice,
        "fourth_Choice": req.body.fourthChoice,
    });
    question_1.default.updateOne({ _id: id }, updatedQuestionList, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        question_1.default.findById(id, {}, {}, (err, questionToUpdate) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            let surveyId = JSON.stringify(questionToUpdate, ['survey_id']).substr(14, 24);
            console.log(surveyId);
            res.redirect('/question/' + surveyId);
        });
    });
}
exports.ProcessUpdateQuestionPage = ProcessUpdateQuestionPage;
function ProcessDeleteQuestionPage(req, res, next) {
    let id = req.params.id;
    question_1.default.findById(id, {}, {}, (err, questionToDelete) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let surveyId = JSON.stringify(questionToDelete, ['survey_id']).substr(14, 24);
        question_1.default.remove({ _id: id }, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect('/question/' + surveyId);
        });
    });
}
exports.ProcessDeleteQuestionPage = ProcessDeleteQuestionPage;
function DisplayDatePage(req, res, next) {
    surveys_1.default.find((err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(surveyCollection);
        console.log(surveyCollection[(surveyCollection.length - 1)]._id);
        res.render('index', { title: 'Add Date', page: 'date', list: surveyCollection, displayName: (0, user_1.UserDisplayName)(req) });
    });
}
exports.DisplayDatePage = DisplayDatePage;
function ProcessDatePage(req, res, next) {
    surveys_1.default.find((err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(surveyCollection);
        console.log(surveyCollection[(surveyCollection.length - 1)]._id);
        let id = surveyCollection[(surveyCollection.length - 1)]._id;
        console.log(req.body);
        let updatedSurveyList = new surveys_1.default({
            "_id": id,
            "end_Date": req.body.endDate,
            'start_Date': req.body.startDate
        });
        surveys_1.default.updateOne({ _id: id }, updatedSurveyList, {}, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect('/question/' + id);
        });
    });
}
exports.ProcessDatePage = ProcessDatePage;
//# sourceMappingURL=question.js.map