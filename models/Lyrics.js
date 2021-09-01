const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OtherSettingsSchema = mongoose.Schema({
    slideAnimation: Boolean,


});
const ImagePropertiesSchema = mongoose.Schema({
    height: Number,
    opacity: Number,
    blurriness: Number,

});
const TextPropertiesSchema = mongoose.Schema({
    fontSize: Number,
    fontWeight: Number,
    alignItems: String,
    justifyContent: String,
    textColor: String
});

const lyricsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    lyricist: {
        type: String,
        required: false
    },
    composer: {
        type: String,
        required: false
    },
    content: [{
        type: String,
        required: true
    }],
    img: {
        type: String,
    },
    text: {
        type: TextPropertiesSchema,
        require: true
    },
    image: {
        type: ImagePropertiesSchema,
        require: true
    },
    others: {
        type: OtherSettingsSchema,
        require: true
    }

}, { timestamps: true })

const Lyrics = mongoose.model('Lyrics', lyricsSchema)
module.exports = Lyrics;