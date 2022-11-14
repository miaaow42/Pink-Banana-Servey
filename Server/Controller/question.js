"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTakeSurveyPage = exports.DisplayTakeSurveyPage = exports.DisplayExpiryDatePage = exports.ProcessDeleteQuestionPage = exports.ProcessUpdateQuestionPage = exports.DisplayUpdateQuestionPage = exports.ProcessAddSAQuestionPage = exports.DisplayAddSAQuestionPage = exports.ProcessAddTFQuestionPage = exports.DisplayAddTFQuestionPage = exports.ProcessAddMCQuestionPage = exports.DisplayAddMCQuestionPage = exports.ProcessQuestionPage = exports.DisplayQuestionPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
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
            res.render('index', { title: 'Question', page: 'question', list: questionToAdd, list2: questionToAdd2 });
        });
    });
}
exports.DisplayQuestionPage = DisplayQuestionPage;
function ProcessQuestionPage(req, res, next) {
    let id = req.params.id;
    let updatedSurveyList = new surveys_1.default({
        "_id": id,
        "title": req.body.name,
        "author": req.body.author
    });
    surveys_1.default.updateOne({ _id: id }, updatedSurveyList, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessQuestionPage = ProcessQuestionPage;
function DisplayAddMCQuestionPage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);
        res.render('index', { title: 'Add Multiple Choice Question', page: 'update-question-mc', list: questionToAdd, id: id });
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
    console.log(id);
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
            res.render('index', { title: 'Add True or False Question', page: 'update-question-tf', list: questionToAdd, list2: questionToAdd2 });
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
function DisplayAddSAQuestionPage(req, res, next) {
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
            res.render('index', { title: 'Add Short Answer Question', page: 'update-question-sa', list: questionToAdd, list2: questionToAdd2 });
        });
    });
}
exports.DisplayAddSAQuestionPage = DisplayAddSAQuestionPage;
function ProcessAddSAQuestionPage(req, res, next) {
    let id = req.params.id;
    let newQuestion = new question_1.default({
        "questionText": req.body.questionText,
        "questionType": "Short Answer",
        "survey_id": req.params.id,
        "option_Text": req.body.optionText
    });
    question_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/question/' + req.params.id);
    });
}
exports.ProcessAddSAQuestionPage = ProcessAddSAQuestionPage;
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
            res.render('index', { title: 'Update Question', page: 'update-question-tf', list2: questionToUpdate });
        }
        else if (surveyId == "Multiple C") {
            res.render('index', { title: 'Update Question', page: 'update-question-mc', list: questionToUpdate });
        }
        else {
            res.render('index', { title: 'Update Question', page: 'update-question-sa', list2: questionToUpdate });
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
function DisplayExpiryDatePage(req, res, next) {
    surveys_1.default.find((err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(surveyCollection);
        res.render('index', { title: 'Survey List', page: 'date', list: surveyCollection });
    });
}
exports.DisplayExpiryDatePage = DisplayExpiryDatePage;
function DisplayTakeSurveyPage(req, res, next) {
    let id = req.params.id;
    question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd });
    });
}
exports.DisplayTakeSurveyPage = DisplayTakeSurveyPage;
function ProcessTakeSurveyPage(req, res, next) {
    console.log(req.body);
    console.log("Thanks for taking survey");
}
exports.ProcessTakeSurveyPage = ProcessTakeSurveyPage;
//# sourceMappingURL=question.js.map