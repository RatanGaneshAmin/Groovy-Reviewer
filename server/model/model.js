const mongoose = require ('mongoose');

var schema_1 = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{collection:'signup'})
var schema_2 = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{collection:'login'})

const Userdb = mongoose.model('signup',schema_1);
const login = mongoose.model('login',schema_2);
module.exports = {
    Userdb: Userdb,
    login: login
};