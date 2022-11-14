import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';

import { NativeError } from 'mongoose';
// Display Edit question page
export function DisplayQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id; 
    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);
            
          }
          res.render('index', { title: 'Question', page: 'question', list: questionToAdd, list2: questionToAdd2});      
        });
    });   
}

// Process Update page
export function ProcessQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedSurveyList = new SurveyList
    ({
      "_id": id,
      "title": req.body.name,
      "author": req.body.author
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    SurveyList.updateOne({_id: id}, updatedSurveyList, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }     
      res.redirect('/survey-list')
    });
}


//Display add MC question page
export function DisplayAddMCQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);
    
 
        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
          console.log(questionToAdd);
        res.render('index', { title: 'Add Multiple Choice Question', page: 'update-question-mc', list: questionToAdd, id: id});
        });               
    
}


// Process Create page
export function ProcessAddMCQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "Multiple Choice",
    "survey_id": req.params.id,
    "first_Choice": req.body.firstChoice,
    "second_Choice": req.body.secondChoice,
    "third_Choice": req.body.thirdChoice,
    "fourth_Choice": req.body.fourthChoice
  });

  console.log(id);

  // db.list.insert({list data is here...})
  QuestionList.create(newQuestion, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/question/'+ req.params.id);
  });
}

//Display add MC question page
export function DisplayAddTFQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);

    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);

        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
        res.render('index', { title: 'Add True or False Question', page: 'update-question-tf', list: questionToAdd, list2: questionToAdd2});
        });               
    }); 
}

// Process Create page
export function ProcessAddTFQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "True/False",
    "survey_id": req.params.id
  });

  console.log(id);

  // db.list.insert({list data is here...})
  QuestionList.create(newQuestion, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/question/'+ req.params.id);
  });
}

//Display add MC question page
export function DisplayAddSAQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);


    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);

        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
        res.render('index', { title: 'Add Short Answer Question', page: 'update-question-sa', list: questionToAdd, list2: questionToAdd2});
        });               
    }); 
}

// Process Create page
export function ProcessAddSAQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "Short Answer",
    "survey_id": req.params.id,
    "option_Text" : req.body.optionText
  });

  // db.list.insert({list data is here...})
  QuestionList.create(newQuestion, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/question/'+ req.params.id);
  });
}

//Display Update Page
export function DisplayUpdateQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.list.find({"_id": id})
    QuestionList.findById(id, {}, {}, (err, questionToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log(questionToUpdate)
     
        //show the update view
        //get the survey_type
       let surveyId = JSON.stringify(questionToUpdate, ['questionType']).substr(17,10);
       console.log(surveyId);
       if(surveyId == "True/False"){
        res.render('index', { title: 'Update Question', page: 'update-question-tf', list2: questionToUpdate })
       }else if (surveyId == "Multiple C"){
        res.render('index', { title: 'Update Question', page: 'update-question-mc', list: questionToUpdate })
       }else{
        res.render('index', { title: 'Update Question', page: 'update-question-sa', list2: questionToUpdate })
       }

    }); 
}

// Process Update page
export function ProcessUpdateQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedQuestionList = new QuestionList
    ({
      "_id": id,
      "questionText": req.body.questionText,
      "first_Choice": req.body.firstChoice,
      "second_Choice": req.body.secondChoice,
      "third_Choice": req.body.thirdChoice,
      "fourth_Choice": req.body.fourthChoice,
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    QuestionList.updateOne({_id: id}, updatedQuestionList, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      QuestionList.findById(id, {}, {}, (err, questionToUpdate) =>
      {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

      //get the survey_id
       let surveyId = JSON.stringify(questionToUpdate, ['survey_id']).substr(14,24);
       console.log(surveyId);
  
       res.redirect('/question/' + surveyId);
      });
    });
}


// Process Delete page
export function ProcessDeleteQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    QuestionList.findById(id, {}, {}, (err, questionToDelete) =>
      {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //get the survey_id
        let surveyId = JSON.stringify(questionToDelete, ['survey_id']).substr(14,24);
        
        // db.clothing.remove({"_id: id"})
        QuestionList.remove({_id: id}, (err) => {
          if(err)
          {
            console.error(err);
            res.end(err);
          }
    
        res.redirect('/question/' + surveyId);
      });
  });
}

// Display question page
export function DisplayExpiryDatePage(req: Request, res: Response, next: NextFunction): void
{    
    //db.list.find()
    SurveyList.find((err, surveyCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        } 
        console.log(surveyCollection);
        res.render('index', { title: 'Survey List', page: 'date', list: surveyCollection });      
       
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
          res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd}); 
        });
}

// Process take-survey page
export function ProcessTakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
  // QuestionList.find({survey_id: req.params.id}, {}, {}, (err,questionToFind) =>
  // {
  //   if(err)
  //   {
  //     console.error(err);
  //     res.end(err);
  //   }
  //   console.log(questionToFind);
  // });
  
  console.log(req.body);
  console.log("Thanks for taking survey");
  
}