var proxyUrl = "http://34.82.0.93:3300/jsonp";
// var proxyUrl = "http://127.0.0.1:3300/jsonp";

function sendRequest(targetUrl, callbackName) {
    var script = document.createElement("script");
    script.src = proxyUrl + "?callback=" + callbackName +
        "&url=" + encodeURIComponent(targetUrl);
    script.onload = function() { document.body.removeChild(script); }
    document
        .body.appendChild(script);
}

window.onload = function() {
    var search = document.getElementById("search");
    var name = document.getElementById("name");
    var number = document.getElementById("number");
    var meter = document.getElementById("meter");
    search.onkeyup = function(event) {
        if (event.key === "Enter") {
            var value = parseInt(search.value, 10);
            if (value > 0) {
                search.classList.add("button-search");
                window.location.href = "?" + value;
            }
        }
    };
    var id = parseInt(window.location.search.substring(1), 10);
    if (id > 0) {
        window.bilicount_init =
            function(response) {
                var cardData = response.data.card;
                name.innerText = cardData.name;
                meter.innerText = cardData.fans;
            }
        window.bilicount_update =
            function(response) {
                meter.innerText = response.data.card.fans;
            }
        var targetUrl =
            "https://api.bilibili.com/x/web-interface/card?mid=" + id;

        sendRequest(targetUrl, "bilicount_init");
        setInterval(function() { sendRequest(targetUrl, "bilicount_update"); },
            15000);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else
        name.style.display = number.style.display = "none";
};
