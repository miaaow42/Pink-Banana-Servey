import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '../Routes/index';

const app = express();
export default app; //export app as the default object for this module

//module for database setup
import  mongoose, {mongo} from 'mongoose';

//DB Configuration
import * as DBConfig from './db';

const newLocal = (DBConfig.RemoteURI) ? DBConfig.RemoteURI : DBConfig.LocalURI;
mongoose.connect(newLocal);

const db = mongoose.connection; //alias for the mongoose connection
db.on("error", () =>
{
  console.error("Connection Error");
});

db.once("open",() => 
{
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});


// view engine setup
app.set('views', path.join(__dirname, '../../Server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/survey-list', indexRouter);
app.use('/question', indexRouter);
app.use('/take-survey', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//module.exports = app;
