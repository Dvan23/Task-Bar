const mongoose =require('mongoose')
const Profile = new mongoose.Schema({
    value :{type:String,required:[true,'Please provide value'],trim:true},
    
})


const model =mongoose.model('Taskbar',Profile)
module.exports={model}