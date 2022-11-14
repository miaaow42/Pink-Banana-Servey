import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema; // alias for mongoose Schema


const SurveySchema = new Schema
({
    title: String,
    author: String,
    start_Date: Date,
    end_Date: Date,
    isActive: Boolean,
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