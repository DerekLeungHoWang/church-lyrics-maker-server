const Lyrics = require("../models/Lyrics");
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const axios = require("axios")

const createPowerPoint = async (req, res) => {
  try {
      console.log("generating")
    let pres = new pptxgen();
    let cart = req.body.cart;
    let newCart = JSON.parse(JSON.stringify(cart))
    const imgList = [];
     
    await Promise.all(
      newCart.map(async (d) => {
  
        if (d.img) {
          console.log("yes");
          let result = await axios.get(d.img, {
            responseType: "arraybuffer",
          });

          console.log("result === " , result)
          let image = Buffer.from(result.data, "binary").toString("base64");
          image = `data:image/jpg;base64,${image}`;
          imgList.push({
            _id: d._id,
            image,
          });
        }
      })
    );
    console.log("getting here 22222")
    console.log(newCart)
    newCart.map((d, i) => {
      return imgList.map((img) => {
        if (d.img && d._id == img._id) {
          return (d.img = img);
        }
      });
    });

    newCart.map((d) => {
      let slide = pres.addSlide();
      d.img.image &&
        slide.addImage({
          data: d.img.image,
          w: "100%",
          h: `100%`,
          sizing: {
            w: "100%",
            h: `${d.pptProperties.height}%`,
            type: "crop",
           
          },
        });
      slide.addText(d.title, {
        x: "0",
        y: "0",
        w: "100%",
        h: `${d.pptProperties.height}%`,
        align: "center",
        valign: "middle",
        color: "ffffff",
        fontSize:d.pptProperties.fontSize
      });
      slide.background = { color: "#000000" };

      d.content.map((text) => {
        let slide_2 = pres.addSlide();
        d.img.image &&
          slide_2.addImage({
            data: d.img.image,
            w: "100%",
            h: `100%`,
            sizing: {
              w: "100%",
              h: `${d.pptProperties.height}%`,
              type: "crop",
            },
          });
        slide_2.addText(text, {
          x: "0",
          y: "0",
          w: "100%",
          h: `${d.pptProperties.height}%`,
          align: "center",
          valign: "middle",
          color: "ffffff",
          fontSize:d.pptProperties.fontSize
        });
        slide_2.background = { color: "#000000" };
      });
    });

    console.log("finished adding slides")

    pres
      .stream()
      .then((data) => {
          console.log("stream ");
          console.log(data)
        let fileName = "Sample Presentation.pptx";
        res.writeHead(200, {
          "Content-disposition": "attachment;filename=" + fileName,
          "Content-Length": data.length,
        });

        res.end(Buffer.from(data, "binary"));
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

const addNewLyrics = (req, res) => {
  try {
    let title = req.body.title;
    Lyrics.findOne({ title: title }).then((result) => {
      if (result !== null) {
        Lyrics.findByIdAndUpdate(result._id, req.body).then((updateResult) => {
          res.send("updated");
        });
      } else {
        const lyrics = new Lyrics(req.body);
        lyrics
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((e) => {});
      }
    });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

const findAllLyrics = (req, res) => {
  try {
    Lyrics.find().then((result) => res.json(result));
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

const findLyricsById = (req, res) => {
  const id = req.params.id;
  try {
    Lyrics.findById(id).then((result) => res.json(result));
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

const editLyricsById = (req, res) => {
  const id = req.params.id;
  try {
    Lyrics.findByIdAndUpdate(id, {
      title: req.body.title,
    }).then((result) => res.json(result));
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

const deleteLyricsById = async (req, res) => {
  const id = req.params.id;
  try {
    await Lyrics.findByIdAndDelete(id).then((result) => res.json("deleted"));
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

module.exports = {
  addNewLyrics,
  findAllLyrics,
  findLyricsById,
  editLyricsById,
  deleteLyricsById,
  createPowerPoint,
};
// let newCart = JSON.parse(JSON.stringify(cart));

// pres.writeFile({ fileName: "Sample Presentation.pptx" }).then(() => {
//   setIsGenerating(false);
// });
