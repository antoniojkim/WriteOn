var MAX_REFS = 1;
var KEY = '8125bd8ac4be47f69188162591a4debb';

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

var suggestion = '';

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, function(selection) {
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

    suggestion = getSuggestion();

    console.log(suggestion);

    //TEMPORARY
    newsQueries[0] = "positive happy gun control";
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

function bingNewsSearchAPI(params, callback) {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=" + params,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function (response) { callback(response) },
        error: function () { console.log("error"); },
        headers: {
            'Ocp-Apim-Subscription-Key': KEY,
        }
    });
}

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

function bingVideosSearchAPI(params, callback) {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v7.0/videos/search?q=" + params,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function (response) { callback(response) },
        error: function () { console.log("error"); },
        headers: {
            'Ocp-Apim-Subscription-Key': KEY,
        }
    });
}

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
	console.log(wow)
	somethingreplace(wow);

}
document.getElementById('b1').addEventListener('click', b1);
