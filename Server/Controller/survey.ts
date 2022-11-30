import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';
import ResponseList from '../Models/response';

import { NativeError } from 'mongoose';
import { UserDisplayName } from './user';
import moment from 'moment';



export function DisplaySurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
    if(!req.user) 
    {     
      SurveyList.find((err, surveyCollection) =>
      {
         res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection});      
      }
  )} 
    else
    {
    //db.list.find()
    if(req.user.username === 'admin')
    {
      SurveyList.find((err, surveyCollection) =>
      {      
        QuestionList.find((err, questionCollection: any) => 
        {       
          ResponseList.find((err, responseCollection: any) =>
          {             
            res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, list2:questionCollection, list3: responseCollection, displayName: UserDisplayName(req)});
          })                  
        });        
    });
  } else{

    SurveyList.find({user_id: req.user.id}, {}, {}, (err, surveyCollection) =>
    {
      QuestionList.find((err, questionCollection: any) => 
        {       
          ResponseList.find((err, responseCollection: any) =>
          {             
            res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, list2:questionCollection, list3: responseCollection, displayName: UserDisplayName(req)});
          })                  
        });         
    });
  }
}
}

export function DisplayAllSurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
  let dateNow = moment(new Date(Date.now())).format('YYYY-MM-DD');
  SurveyList.find({start_Date:{$lte:dateNow}, end_Date:{$gte:dateNow}}, (err, surveyCollection) =>
      { 
         res.render('index', { title: 'Surveys you can take now', page: 'survey-list-all', list: surveyCollection, displayName:UserDisplayName(req), dateNow: dateNow });      
      });
};

// Display Create page
export function DisplayAddSurveyPage(req: Request | any, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Create Survey', page: 'update-survey', list: '', author: req.user.username, displayName: UserDisplayName(req)});
}

// Process Create page
export function ProcessAddSurveyPage(req: Request | any, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
  let newSurvey = new SurveyList
  ({
    title: req.body.name,
    author: req.user.username,
    user_id: req.user.id
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

// Display take-survey page
export function DisplayTakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
  let id = req.params.id;
  QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);          
          }
          res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd, displayName: UserDisplayName(req)}); 
        });
}

// Process take-survey page
export function ProcessTakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
   let responseJson = JSON.stringify(req.body, null, 2);
  
  // console.log(responseJson);
  // console.log("Thanks for taking survey");
  // console.log(new Map(Object.entries(req.body)));

  //let newResponse = new OptionList(responseJson);
  let newResponse: any = new ResponseList
  ({
    survey_id: req.params.id, 
    question: 
    {
        option: responseJson
    } 

  });

  console.log(req.body);
  console.log("---------------------------------");
  // console.log(newResponse.question.option);
  // let a = JSON.parse(newResponse.question.option);

  // console.log(a);


  // console.log(Object.values(a).length);
  // console.log(Object.keys(a));
  ResponseList.create(newResponse , (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);

    }
    
    // OptionList.find((err, ResponseCollection: any) =>
    // {
    //   console.log(2);
    //   let temp = JSON.parse(ResponseCollection[ResponseCollection.length - 1].optionText);
    //   console.log(temp);
    //   //console.log(surveyCollection[surveyCollection.length - 1].optionText.);
    //   console.log(temp.q1);
    //   console.log(Object.keys(temp).length);

    // });
  });
}

// Display export page
export function DisplayExportSurveyPage(req: Request,res: Response,next: NextFunction): void 
{
  let id = req.params.id;
  SurveyList.find({ _id: id }, {}, {}, (err, surveyCollection) => {
    QuestionList.find({survey_id: id },{}, {}, (err, questionCollection: any) => {
        ResponseList.find({survey_id: id }, {}, {}, (err, responseCollection: any) => {
          res.render("index", {
            title: "Survey List",
            page: "export",
            list: surveyCollection,
            list2: questionCollection,
            list3: responseCollection,
            displayName: UserDisplayName(req),
          });
        });
    });
  });
}

export function ProcessExportSurveyPage(req: Request,res: Response,next: NextFunction):void 
{
  console.log("hello");
}