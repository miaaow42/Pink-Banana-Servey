import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage} from '../Controller/index';

import { DisplaySurveyListPage, DisplayAddSurveyPage, ProcessAddSurveyPage, DisplayUpdateSurveyPage, ProcessDeleteSurveyPage} from '../Controller/survey';

import { DisplayQuestionPage,ProcessQuestionPage,DisplayAddMCQuestionPage, ProcessAddMCQuestionPage, DisplayUpdateQuestionPage,
        ProcessUpdateQuestionPage, ProcessDeleteQuestionPage, DisplayAddTFQuestionPage,
        ProcessAddTFQuestionPage, DisplayAddSAQuestionPage, ProcessAddSAQuestionPage,
        DisplayExpiryDatePage, DisplayTakeSurveyPage, ProcessTakeSurveyPage
        } from '../Controller/question';    
    /* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET contact list page. */
router.get('/survey-list',  DisplaySurveyListPage);

/*GET display /survey-list/add page */
router.get('/add-survey', DisplayAddSurveyPage);

/*POST process /survey-list/add page */
router.post('/add-survey',  ProcessAddSurveyPage);

/*GET Process /contacts-list/delete/:id */
router.get('/delete-survey/:id',  ProcessDeleteSurveyPage);

/*GET question page */
router.get('/question/:id', DisplayQuestionPage);

/*POST process /contacts-list/update/:id page */
router.post('/question/:id',  ProcessQuestionPage);

/*GET display /add-question-mc/:id page */
router.get('/add-question-mc/:id', DisplayAddMCQuestionPage);

/*Post display /add-question-mc/:id page */
router.post('/add-question-mc/:id', ProcessAddMCQuestionPage);

/*GET display /add-question-tf/:id page */
router.get('/add-question-tf/:id', DisplayAddTFQuestionPage);

/*Post display /add-question-tf/:id page */
router.post('/add-question-tf/:id', ProcessAddTFQuestionPage);

/*GET display /add-question-sa/:id page */
router.get('/add-question-sa/:id', DisplayAddSAQuestionPage);

/*Post display /add-question-sa/:id page */
router.post('/add-question-sa/:id', ProcessAddSAQuestionPage);

/*GET display /edit-question/:id page */
router.get('/update-question/:id', DisplayUpdateQuestionPage);

/*Post display /edit-question/:id page */
router.post('/update-question/:id', ProcessUpdateQuestionPage);

/*GET Process /question/delete/:id */
router.get('/delete-question/:id',  ProcessDeleteQuestionPage);

/*GET display /expiry-date/:id page */
router.get('/date', DisplayExpiryDatePage);

/*GET display /take-survey/:id page */
router.get('/take-survey/:id', DisplayTakeSurveyPage);

/*POST display /take-survey/:id page */
router.post('/take-survey/:id', ProcessTakeSurveyPage);

module.exports = router;
