// Constants
const base_url = window.location.href;
const data_port = base_url + 'data'

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

    // Page scrolling

    // Changing visuals

    // Key presses
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            console.log("go forward a page");
            return;
        case 'ArrowLeft':
            console.log("go back a page");
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
    const res = post(data_port, {
        mangaName: Name.value,     
        mangaChapter: Chapter.value 
   });
   console.log((await res).text());
}