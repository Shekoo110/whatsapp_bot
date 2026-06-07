const axios = require("axios");
const cheerio = require("cheerio");

async function getBleachImage() {
    try {
        const url = "https://bleach.fandom.com/wiki/Rukia_Kuchiki";

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const img = $(".pi-image-thumbnail").attr("src");

        console.log("Image URL:", img);

    } catch (err) {
        console.log("Error:", err.message);
    }
}

getBleachImage();
