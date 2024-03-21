var baseUrl = "https://api.efaz.dev/api/admin/approved-count"
var latest = new Date().getTime()
var countdown_total = 60
function updateObject(text) {
    var object = document.getElementById("main_message")
    object.innerHTML = text
}
function pageInIframe() {
    return (window.location !== window.parent.location);
}
async function scan() {
    latest = new Date().getTime()
    fetch(baseUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(new_json => {
            if (new_json["text"]) {
                updateObject(new_json["text"])
            } else if (new_json["message"]) {
                updateObject(new_json["message"])
            } else {
                updateObject("Unable to validate message.")
            }
        }).catch(err => {
            updateObject("Unable to fetch server request.")
        })
}
async function main() {
    if (pageInIframe() == true) {}
    await scan()
    setTimeout(() => { main(); }, countdown_total * 1000);
}
window.onload = main