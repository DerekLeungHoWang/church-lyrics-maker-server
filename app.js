const express = require('express');
const path = require('path');
//const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');


const app = express()
app.use(cors({
    origin: '*'
}));
const dbURI = 'mongodb+srv://root:1234@cluster0.yvke5.mongodb.net/lyricsDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db")
        app.listen(PORT, () => console.log(`server starting on port ${PORT}`))
    })
    .catch((err) => {
        console.log("error : " ,err)
    })

const PORT = process.env.PORT || 8080
const lyrics = require("./routes/LyricsRoute");
app.use(express.json());
app.use("/lyrics", lyrics);



app.use(express.static(path.join(__dirname, 'public')))

