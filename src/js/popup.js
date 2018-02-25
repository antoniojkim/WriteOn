var MAX_REFS = 1;
var KEY = '8125bd8ac4be47f69188162591a4debb';
var text;
//input (from user)
var userText = "";

//input (from model)
var keyWordsOrPhrases = [];

var strongestSentiment = 'negative'; //sentiment...

var strongestEmotion = 'anger'; //emotions...

//output
var newsUrls = [];
var summarizedNews = [];

var videoUrls = [];

var newsQueries = [];

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, function(selection) {
    text = selection[0];
    document.getElementById("input").innerHTML = selection[0];
    userText = selection[0];

    initValues();
});

function initValues(){
    
    //analyze text using indico model
    analyseText(userText, setResponse);

    // response...get:
    // emotion
    // sentiment
    // key words -> articles/videos
    keyWordsOrPhrases = getKeyWordsOrPhrases();

    strongestSentiment = getSentiment();

    strongestEmotion = getEmotion();

    //update queries
    for(i = 0; i < MAX_REFS; i++){
        newsQueries[i] = strongestSentiment + " " + strongestEmotion + " " + keyWordsOrPhrases[i];
    }

    //TEMPORARY
    newsQueries[0] = "negative angry gun control";
}

//TEMPORARY FUNCS
function getKeyWordsOrPhrases(){
    return keyWordsOrPhrases;
}

function getSentiment() {
    return "negative";
}

function getEmotion() {
    return "angry";
}
//TEMPORARY FUNCS

document.getElementById('showmore').addEventListener('click', function () {
    var x = document.getElementById("more");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none";
    }
});

document.getElementById('news').addEventListener('click', function () {
    for(i = 0; i < newsQueries.length; i++){
        bingNewsSearchAPI(newsQueries[i], newsResponseHandler);
    }
});

function summaryResponseHandler(response) {
    //append array with new article summary
    summarizedNews[summarizedNews.length] = response;
}

function newsResponseHandler(response) {
    var jsonObject = response;
    var newsArticles = jsonObject.value;

    for (i = 0; i < newsArticles.length && i < MAX_REFS; i++) {
        var articleUrl = newsArticles[i].url;
        console.log(articleUrl);
        newsUrls[i] = articleUrl;

        //summarize article
        summarizeArticle(articleUrl, summaryResponseHandler);
    }
};


document.getElementById('videos').addEventListener('click', function () {
    for (i = 0; i < keyWordsOrPhrases.length; i++) {
       bingVideosSearchAPI(keyWordsOrPhrases[i], videosResponseHandler);
    }
});

function videosResponseHandler(response) {
    var jsonObject = response;
    var videos = jsonObject.value;

    for (i = 0; i < videos.length && i < MAX_REFS; i++) {
        //remove and input into button layouts
        var webUrl = videos[i].webSearchUrl;
        console.log(webUrl);
        videosUrls[i] = webUrl;
    }
};

function show_more(){
	var x = document.getElementById("more");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none";
    }
}
document.getElementById('showmore').addEventListener('click', show_more);



function b1(){
    var link = "https://writerunblocker.azurewebsites.net/src/html/test.html?q="+text
	chrome.tabs.create({active: true, url: link});
}
document.getElementById('b1').addEventListener('click', b1);
