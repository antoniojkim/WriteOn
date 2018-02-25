var MAX_REFS = 5;
var KEY = '8125bd8ac4be47f69188162591a4debb';

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("input").innerHTML = selection[0];
});

document.getElementById('showmore').addEventListener('click', function () {
    var x = document.getElementById("more");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none";
    }
});

document.getElementById('news').addEventListener('click', function () {
    alert('a');
    bingNewsSearchAPI("banana republic", newsResponseHandler);
});

function newsResponseHandler(response) {
    var jsonObject = response;
    var newsArticles = jsonObject.value;

    for (i = 0; i < newsArticles.length && i < 2 * MAX_REFS; i += 2) {
        //remove and input into button layouts
        console.log(newsArticles[i].url);
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

document.getElementById('videos').addEventListener('click', function(){
    bingVideosSearchAPI("banana republic", videosResponseHandler);
});

function videosResponseHandler(response) {
    var jsonObject = response;
    var videos = jsonObject.value;

    console.log(videos);

    for (i = 0; i < videos.length && i < 2 * MAX_REFS; i += 2) {
        //remove and input into button layouts
        console.log(videos[i].webSearchUrl);
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


document.getElementById('blogs').addEventListener('click', function () {
    bingBlogsSearchAPI("banana", blogsResponseHandler);
});

function blogsResponseHandler(response) {
    var jsonObject = response;
    var blogs = jsonObject.value;

    console.log(blogs);

    for (i = 0; i < blogs.length && i < 2 * MAX_REFS; i += 2) {
        //remove and input into button layouts
        console.log(blogs[i].webSearchUrl);
    }
};

function bingBlogsSearchAPI(params, callback) {
    $.ajax({
        url: "https://www.twingly.com/search?q=gun+control",
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function (response) { callback(response) },
        error: function () { console.log("error"); },
    });
}

function show_more(){
	var x = document.getElementById("more");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none"
    }
}
document.getElementById('showmore').addEventListener('click', show_more);



function b1(){
	console.log(wow)
	somethingreplace(wow);

}
document.getElementById('b1').addEventListener('click', b1);
