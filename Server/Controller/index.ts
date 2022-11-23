import express, {Request, Response, NextFunction} from 'express';
//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';

import { UserDisplayName } from './user';


import { NativeError } from 'mongoose';
export function DisplayHomePage(req: Request, res: Response, next: NextFunction):void
{

    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}
