import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema; // alias for mongoose Schema

import user from '../Models/user';

const SurveySchema = new Schema
({
    title: String,
    author: String,
    user_id: String,
    start_Date: String,
    end_Date: String,
    isActive: Boolean,
    questionText: String,

    created: 
    {
        type: String,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    },
    updated:
    {
        type: String,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
},
{
    collection: "survey"
});

const Model = mongoose.model("SurveyList", SurveySchema);

export default Model;