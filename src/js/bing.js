/**
 * Created by Antonio on 2018-02-25.
 */

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