const { mongoose, Schema, model } = require("mongoose")

const ImageSchema = Schema({
    names:{
        type:[String]
    },
    tags: {
        type: String
    },
    people:  {
        type: String
    },
    locations:  {
        type: String
    },
    desc:  {
        type: String
    },
    date:  {
        type: Date
    }
})

const ImageModel = model('imagedata',ImageSchema)

module.exports = ImageModel
