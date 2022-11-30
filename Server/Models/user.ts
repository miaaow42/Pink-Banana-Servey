import mongoose, {PassportLocalSchema} from 'mongoose';
import moment from "moment";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema
({
    username: String,
    displayName: String,
    created:
    {
        type: Date,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    },
    updated:
    {
        type: Date,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
},
{
    collection: "users"
});

UserSchema.plugin(passportLocalMongoose);

declare global
{
    export type UserDocument = mongoose.Document &
    {
        _id: String,
        username: String,
        displayName: String
    }
}

const Model = mongoose.model("User", UserSchema as PassportLocalSchema);
export default Model; 