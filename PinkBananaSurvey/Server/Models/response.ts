import mongoose from "mongoose";
import moment from "moment";
import question from "./question";
const Schema = mongoose.Schema; // alias for mongoose Schema

const ResponseSchema = new Schema
({   
    survey_id: String,
    question: 
    {
        option: Array
    } 
},
{
    collection: "response"
});

const Model = mongoose.model("ResponseList", ResponseSchema);


export default Model;