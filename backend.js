// constants
const port = 3001;
    //libraries
const exp = require('constants');
const express = require('express');
const path = require('path');
const MFA = require('mangadex-full-api');

    //ENVs
require('dotenv').config();
const password = process.env.KEY_PASSWORD; 
const username = process.env.KEY_USERNAME;

// Code
    // Setup localhost
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'frontEnd')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'frontEnd/front.html'));
})
    // Post request
app.post('/data', async (req, res) => {
    const name = req.body.mangaName;
    const chapter = req.body.mangaChapter;
    // Get the manga panels
    MFA.login(username, password, 'bin/.md_cache').then(
        async () => {
            const manga = await MFA.Manga.search({
                    title:name,
                    limit:1
            },true)
            // Finds all chapters that belongs to the found manga
            const chapters = await manga[0].getFeed({
                translatedLanguage: ['en'],
                limit: Infinity
            }, true);
            // Finds the correct chapter of the manga
            let targettedChapter;
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].chapter == chapter) {
                    targettedChapter = chapters[i];
                    break;
                }
            }
            // Gives the page image urls
            const pages = await targettedChapter.getReadablePages();
            // Sends the panels to the front end
            res.send(JSON.stringify({
                pages_urls: pages
            }))
        }   
    )
    .catch( console.error )
})

app.listen(port);   