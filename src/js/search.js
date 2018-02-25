/**
 * Created by Antonio on 2018-02-25.
 */

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    data["q"] = decodeURI(data["q"]);
    console.log(data["q"]);
    document.getElementById("sentence").innerHTML = data["q"];
};

function getEmotionChart(emotionDiv){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // Some raw data (not necessarily accurate)
        console.log(getResponse());
        var results = getResponse()["results"]["emotion"]["results"];

        var angerData = [];
        var joyData = [];
        var sadnessData = [];
        var fearData = [];
        var surpriseData = [];

        for(i = 0; i < results.length; i++){
            angerData.push(results[i]["anger"]);
            joyData.push(results[i]["joy"]);
            sadnessData.push(results[i]["sadness"]);
            fearData.push(results[i]["fear"]);
            surpriseData.push(results[i]["surprise"]);
        }
        console.log(angerData);
        console.log(joyData);
        console.log(sadnessData);
        console.log(fearData);
        console.log(surpriseData);

        var emotionDataSet = [];
        emotionDataSet[0] =
            ['Most recent uses', 'Angry', 'Fear', 'Joyful', 'Sad', 'Surprise'];

        for (i = 0; i < results.length; i++) {
            var rowSet = [ (i + 1), angerData[i], joyData[i], sadnessData[i],
                fearData[i], surpriseData[i] ];

            emotionDataSet[i + 1] = rowSet;
        }

        console.log(emotionDataSet);

        var strongestEmotion = getStrongestEmotion(getResponse());
        console.log(strongestEmotion);

        var valEmotion = 0;
        var lineWidth = [3, 3, 3, 3, 3];

        if (strongestEmotion.toLocaleLowerCase().localeCompare("anger")){
            valEmotion = 0;
        }
        else if (strongestEmotion.toLocaleLowerCase().localeCompare("fear")) {
            valEmotion = 1;
        }
        else if (strongestEmotion.toLocaleLowerCase().localeCompare("joyful")) {
            valEmotion = 2;
        }
        else if (strongestEmotion.toLocaleLowerCase().localeCompare("sad")) {
            valEmotion = 3;
        }
        else {
            valEmotion = 4;
        }
        lineWidth[valEmotion] = 8;

        var data = google.visualization.arrayToDataTable(emotionDataSet);

        var options = {
            title : 'Emotional Regression Analsis',
            vAxis: {title: 'Emotional % Stimulus'},
            hAxis: { title: 'Number of uses' },
            pointSize: 0,
            trendlines: {
                0: {
                    opacity: 0.2 * lineWidth[0],
                    visibleInLegend: true,
                    color: 'red',
                    tooltip: false,
                    lineWidth: lineWidth[0]
                },
                1: {
                    opacity: 0.2 * lineWidth[1],
                    color: 'purple',
                    visibleInLegend: true,
                    tooltip: false,
                    lineWidth: lineWidth[1]
                },
                2: {
                    opacity: 0.2 * lineWidth[2],
                    color: 'orange',
                    visibleInLegend: true,
                    tooltip: false,
                    lineWidth: lineWidth[2]
                },
                3: {
                    opacity: 0.2 * lineWidth[3],
                    color: 'blue',
                    visibleInLegend: true,
                    tooltip: false,
                    lineWidth: lineWidth[3]
                },
                4: {
                    opacity: 0.2 * lineWidth[4],
                    color: 'black',
                    visibleInLegend: true,
                    tooltip: false,
                    lineWidth: lineWidth[4]
                },
            }
        };

        var chart = new google.visualization.ScatterChart(emotionDiv);
        chart.draw(data, options);
    }
}
function getSentimentChart(sentimentDiv){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var results = getResponse()["results"]["sentimenthq"]["results"];
        var data = [];
        data.push(['Input Number', 'Sentiment Value']);

        for (i = 0; i < results.length; i++) {
            var rowSet = [i, results[i]];
            data.push(rowSet);
        }

        var tableData = google.visualization.arrayToDataTable(data);

        var options = {
            title: 'Sentiment Regression Analysis',
            hAxis: { title: 'Input Number', minValue: 0, maxValue: results.length },
            vAxis: { title: 'Sentiment % Stimulus', minValue: 0, maxValue: 1 },
            trendlines: {
                0: {
                    type: 'exponential',
                    visibleInLegend: true,
                }
            }
        };

        var chart = new google.visualization.ScatterChart(sentimentDiv);
        chart.draw(tableData, options);
    }
}

function setFeedbackContent(){
    var suggestion  = getSuggestion();

    var div = document.getElementById("feedback-content");
    $(div).empty();

    div.appendChild(document.createElement("hr"));

    var div1 = document.createElement("div");
    div1.setAttribute("class", "container");

    var div2 = document.createElement("div");
    div2.setAttribute("class", "col main_header");
    div1.appendChild(div2);

    var emotionDiv = document.createElement("div");
    emotionDiv.setAttribute("id", "emotionsChart");
    div2.appendChild(emotionDiv);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "col main_header");
    div1.appendChild(div3);

    var sentimentDiv = document.createElement("div");
    sentimentDiv.setAttribute("id", "sentimentChart");
    div3.appendChild(sentimentDiv);

    div.append(div1);

    getEmotionChart(emotionDiv);
    getSentimentChart(sentimentDiv);

    /*
     <div class="container">
         <div class="col main_header">
             <div id="emotionsChart"></div>
         </div>

         <div class="col main_header">
             <div id="sentimentChart"></div>
         </div>
     </div>
     */

    var span = document.createElement("span");
    span.innerHTML = suggestion;
    div.appendChild(span);
}

function submit(){
    var text = document.getElementById("sentence").value;
    console.log("Text:   "+text);
    analyseText(text, function(response){
        setResponse(JSON.parse(response));
        setFeedbackContent();

        div = document.getElementById("newsContainer");
        $(div).empty();
        var params = getNewsSearchParams();
        for (param of params){
            bingNewsSearchAPI(param, function(response){
                console.log(response);
                for (i = 0; i<2; ++i){
                    var a = null;
                    if (response["value"][i]["category"] !== undefined){
                        a = generateNewsArticle(response["value"][i]["name"], response["value"][i]["description"], response["value"][i]["url"], [response["value"][i]["category"]]);
                    }
                    else{
                        a = generateNewsArticle(response["value"][i]["name"], response["value"][i]["description"], response["value"][i]["url"], []);
                    }
                    div.appendChild(a);
                }
            });
        }
    });
}



var numArticles = 0;
function generateNewsArticle(articleTitle, articleSummary, articleURL, tags, imgUrl){
    var div1 = document.createElement("div");
    if (numArticles%2 === 0){
        div1.setAttribute("class", "wow slideInUp item2");
    }
    else{
        div1.setAttribute("class", "wow slideInUp item3");
    }

    var div2 = document.createElement("div");
    div2.setAttribute("class", "container");
    div1.appendChild(div2);

    if (imgUrl !== undefined){
        var img = document.createElement("img");
        img.setAttribute("src", imgUrl);
        img.setAttribute("class", "rounded float-left");
        img.setAttribute("alt", "...");
        div2.appendChild(img);
    }

    var h1 = document.createElement("a");
    h1.setAttribute("class", "h3 display-8");
    h1.setAttribute("href", articleURL);
    h1.setAttribute("target", "_blank");
    h1.innerHTML = articleTitle;
    div2.appendChild(h1);

    var p = document.createElement("p");
    p.setAttribute("class", "lead");
    p.innerHTML = articleSummary;
    div2.appendChild(p);

    for (tag of tags){
        var span = document.createElement("span");
        span.setAttribute("class", "badge badge-primary");
        span.innerHTML = tag;
        div2.appendChild(span);
    }

    numArticles++;

    return div1;
}
