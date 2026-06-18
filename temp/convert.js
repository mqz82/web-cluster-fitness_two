const sharp = require("sharp");
const path = require("path");

const svgPath = path.join(__dirname, "assets", "img", "logo.svg");
const jpgPath = path.join(__dirname, "assets", "img", "logo.jpg");

sharp(svgPath)
    .resize(440, 88, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .jpeg({ quality: 92 })
    .toFile(jpgPath)
    .then(info => {
        console.log("JPG written:", jpgPath);
        console.log("Size:", info.size, "bytes");
        console.log("Dimensions:", info.width + "x" + info.height);
    })
    .catch(err => console.error("Error:", err));
