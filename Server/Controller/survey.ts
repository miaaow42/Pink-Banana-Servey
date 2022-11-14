import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';

import { NativeError } from 'mongoose';

export function DisplaySurveyListPage(req: Request, res: Response, next: NextFunction): void
{
    //db.list.find()
    SurveyList.find((err, surveyCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });      
    });
}

// Display Create page
export function DisplayAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: ''});
}

// Process Create page
export function ProcessAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
  let newSurvey = new SurveyList
  ({
    "title": req.body.name,
    "author": req.body.author,
  });
  console.log(newSurvey);
  // db.list.insert({list data is here...})
  SurveyList.create(newSurvey, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    console.log(newSurvey);
  });
  res.redirect('/date');
}

// Process Delete page
export function ProcessDeleteSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.question.remove({"_id: id"})
  QuestionList.deleteMany({survey_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
  });
  // db.survey.remove({"_id: id"})
  SurveyList.deleteOne({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/survey-list');
  });
}

//Display Update Page
export function DisplayUpdateSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.list.find({"_id": id})
    SurveyList.findById(id, {}, {}, (err, surveyToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log(surveyToUpdate);
        //show the update view
        res.render('index', { title: 'Update Survey', page: 'update-survey', list: surveyToUpdate })
    }); 
}
