const config = require('../config/default');
const mongoose=require('mongoose');
mongoose.Promise=Promise;
mongoose.set('debug', true);
var uri="mongodb://Sasha:1234567890qwer@cluster0-shard-00-00-mfccf.mongodb.net:27017,cluster0-shard-00-01-mfccf.mongodb.net:27017,cluster0-shard-00-02-mfccf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoose.connect(uri,{
    server:{
        socketOptions:{
            keepAlive:1
        },
        poolSize:5
    }

});

const  userSchema= new mongoose.Schema({
    text:{
        type: String,
    },

    photo:{
        type: String
    },

    name:{
        type: String

    }

});


module.exports=mongoose.model('messages', userSchema);