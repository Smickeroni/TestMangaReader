// Constants
const base_url = window.location.href;
const data_port = base_url + 'data'
const imgPanel = document.getElementById("Panel");

// Code
    // Post
const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
}
    // Changing visuals
var currentPage = 0;
var pages = {};

const setupPages = (pagelist) => {
    currentPage = 0;
    pages = pagelist;
    imgPanel.setAttribute("src",pages[currentPage]);
}

const changePage = (cur_page) => {
    imgPanel.setAttribute("src",pages[cur_page]);
}
    // Key presses
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            if (currentPage < pages.length) {
                currentPage++;
                changePage(currentPage);
            }
            return;
        case 'ArrowLeft':
            if (currentPage > 0) {
                currentPage--;
                changePage(currentPage);
            }
            return;
        default:
            return;
    }
}, true)
    // Getting form data
const sendSearchRequest = async () => {
    const Name = document.getElementById("Name");
    const Chapter = document.getElementById("Chapter");
    console.log("Sending search request for \nManga: " + Name.value + "\nChapter: " + Chapter.value);
    const res = await post(data_port, {
        mangaName: Name.value,     
        mangaChapter: Chapter.value 
   });
   const url_list = await res.text();
   const pages = JSON.parse(url_list);
   setupPages(pages.pages_urls);
}