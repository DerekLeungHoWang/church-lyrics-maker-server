const Lyrics = require("../models/Lyrics")

const addNewLyrics = (req, res) => {
    console.log("adding lyrics", req.body);

    try {
        let title = req.body.title
        Lyrics.findOne({ title: title })
            .then(result => {
                console.log("found");
                console.log(result);
                if (result !== null) {
                    console.log("UPDATE OLD", result._id);

                    Lyrics.findByIdAndUpdate(result._id, req.body)
                        .then(updateResult => {
                            res.send("updated")
                        })
                } else {
                    console.log("CREATE NEW");
                    const lyrics = new Lyrics(req.body)
                    lyrics.save()
                        .then(result => {
                            res.send(result)
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }
            })
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
}

const findAllLyrics = (req, res) => {

    try {
        Lyrics.find()
            .then(result => res.json(result))

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }

}

const findLyricsById = (req, res) => {
    const id = req.params.id
    try {
        Lyrics.findById(id)
            .then(result => res.json(result))

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }

}

const editLyricsById = (req, res) => {
    const id = req.params.id
    try {
        Lyrics.findByIdAndUpdate(id, {
            title: req.body.title
        })
            .then(result => res.json(result))

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }

}

const deleteLyricsById = async (req, res) => {
    const id = req.params.id
    try {
        await Lyrics.findByIdAndDelete(id)
            .then(result => res.json("deleted"))

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }

}

module.exports = {
    addNewLyrics,
    findAllLyrics,
    findLyricsById,
    editLyricsById,
    deleteLyricsById
}