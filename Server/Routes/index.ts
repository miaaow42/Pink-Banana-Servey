import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage} from '../Controller/index';

import { DisplaySurveyListPage, DisplayAddSurveyPage, ProcessAddSurveyPage, ProcessDeleteSurveyPage,
     DisplayTakeSurveyPage, ProcessTakeSurveyPage, DisplayAllSurveyListPage, DisplayExportSurveyPage, ProcessExportSurveyPage} from '../Controller/survey';

import { DisplayQuestionPage,ProcessQuestionPage,DisplayAddMCQuestionPage, ProcessAddMCQuestionPage, DisplayUpdateQuestionPage,
        ProcessUpdateQuestionPage, ProcessDeleteQuestionPage, DisplayAddTFQuestionPage,
        ProcessAddTFQuestionPage, /*DisplayAddSAQuestionPage, ProcessAddSAQuestionPage,*/
        DisplayDatePage , ProcessDatePage
        } from '../Controller/question';    

import {DisplaySignInPage, ProcessSignInPage, ProcessSignOutPage, 
    DisplayRegisterPage, ProcessRegisterPage, requireAuth} from '../Controller/user'
/* GET home page. */
router.get('/', DisplayAllSurveyListPage);

/* GET home page. */
router.get('/home', DisplaySurveyListPage);

/* GET sign-in display page */
router.get('/sign-in', DisplaySignInPage);

/* POST sign-in page */
router.post('/sign-in', ProcessSignInPage);

/* GET sign-out display page */
router.get('/sign-out', ProcessSignOutPage);

/* GET register page */
router.get('/register', DisplayRegisterPage);

/* POST register page */
router.post('/register', ProcessRegisterPage);

/* GET survey list page. */
router.get('/survey-list', requireAuth, DisplaySurveyListPage);

/* GET all survey list pages */
router.get('/survey-list-all', DisplayAllSurveyListPage)

/*GET display /survey-list/add page */
router.get('/add-survey', requireAuth,DisplayAddSurveyPage);

/*POST process /survey-list/add page */
router.post('/add-survey', requireAuth, ProcessAddSurveyPage);

/*GET Process /contacts-list/delete/:id */
router.get('/delete-survey/:id', requireAuth, ProcessDeleteSurveyPage);

/*GET question page */
router.get('/question/:id', requireAuth,DisplayQuestionPage);

/*POST process /contacts-list/update/:id page */
router.post('/question/:id', requireAuth, ProcessQuestionPage);

/*GET display /add-question-mc/:id page */
router.get('/add-question-mc/:id', requireAuth,DisplayAddMCQuestionPage);

/*Post display /add-question-mc/:id page */
router.post('/add-question-mc/:id', requireAuth,ProcessAddMCQuestionPage);

/*GET display /add-question-tf/:id page */
router.get('/add-question-tf/:id', requireAuth,DisplayAddTFQuestionPage);

/*Post display /add-question-tf/:id page */
router.post('/add-question-tf/:id', requireAuth,ProcessAddTFQuestionPage);

// /*GET display /add-question-sa/:id page */
// router.get('/add-question-sa/:id', requireAuth,DisplayAddSAQuestionPage);

// /*Post display /add-question-sa/:id page */
// router.post('/add-question-sa/:id', requireAuth,ProcessAddSAQuestionPage);

/*GET display /edit-question/:id page */
router.get('/update-question/:id', requireAuth, DisplayUpdateQuestionPage);

/*Post display /edit-question/:id page */
router.post('/update-question/:id', requireAuth,ProcessUpdateQuestionPage);

/*GET Process /question/delete/:id */
router.get('/delete-question/:id',  requireAuth,ProcessDeleteQuestionPage);

/*GET display /expiry-date/:id page */
router.get('/date', requireAuth,DisplayDatePage);

/*POST display /expiry-date/:id page */
router.post('/date', requireAuth,ProcessDatePage);

/*GET display /take-survey/:id page */
router.get('/take-survey/:id', DisplayTakeSurveyPage);

/*POST display /take-survey/:id page */
router.post('/take-survey/:id', ProcessTakeSurveyPage);

/*GET process /export-survey/:id page */ 
router.get('/export-survey/:id',  requireAuth, DisplayExportSurveyPage);

/*GET process /export-survey/:id page */ 
router.post('/export-survey/:id',  requireAuth, ProcessExportSurveyPage);

module.exports = router;
