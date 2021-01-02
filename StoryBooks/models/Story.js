//Bring in mongoose
const mongoose = require('mongoose')

//Create a schema (the stuff we'll get back from google)
const StorySchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required: true,
            trim: true
        },
        body:
        {
            type:String,
            required: true
        },
        status:
        {
            type:String,
            default: 'Publica',
            enum:['Publica', 'Privada']
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt:
        {
            type: Date, 
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Story', StorySchema)