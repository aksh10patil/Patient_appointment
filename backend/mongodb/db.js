const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb+srv://adarsh1204:AK4SILVER@cluster0.xlebxec.mongodb.net/Freelance");
console.log("Reaches at the Mongodb page");
const UserSignupSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

const UserSigninSchema = new Schema({
    email: String,
    paassword: String
})

const UserSignup = mongoose.model('UserSignup', UserSignupSchema);
const UserSignin = mongoose.model('UserSignin', UserSigninSchema);

module.exports = {
    UserSignup,
}