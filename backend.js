// constants
const port = 3000;
    //libraries
const exp = require('constants');
const express = require('express');
const path = require('path');
const MFA = require('mangadex-full-api');

    //ENVs
require('dotenv').config();
const password = process.env.password; 
const username = process.env.username;

// Code
    // Setup localhost
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'frontEnd')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'frontEnd/front.html'));
})
    // Getting manga page urls
const getManga = (mangaName, mangaChapter) => {
    MFA.login(username, password, 'bin/.md_cache').then(
        async () => {
            const manga = await MFA.Manga.getByQuery(mangaName);
            // finds all chapters that belongs to the found manga
            const chapters = await manga.getFeed({
                translatedLanguage: ['en'],
                limit: Infinity
            }, true);
            // finds the correct chapter of the manga
            let targettedChapter;
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].chapter == mangaChapter) {
                    targettedChapter = chapters[i];
                    break;
                }
            }
            // gives the page image urls
            const pages = await chapter.getReadablePages();
            for (let page of pages) {
                console.log(page);
            }
            return pages;
        }   
    )
    .catch( console.error )
}
    // Send data
app.post('/data', async (req, res) => {
    const name = req.body.mangaName;
    const chapter = req.body.mangaChapter;
    const pageList = await getManga(name, chapter);
    console.log(name,chapter);
    res.send(JSON.stringify({
        pages: pageList
    }))
})

// getManga('pop team epic',1);

app.listen(port);
