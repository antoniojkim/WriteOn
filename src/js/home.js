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
    console.log(data);
};

function submit(){
    var text = document.getElementsByName("sentence").value;
    // analyseText(text, function(response){
    //     setResponse(response);
        var suggestion  = getSuggestion();
        var params = getNewsSearchParams();
        for (param in params){
            bingNewsSearchAPI(param, function(response){
                console.log(response);
            });
        }
    // });
}

var numArticles = 0;
function addNewsArticle(parent, articleTitle, articleSummary, tags, imgUrl){
    var div1 = document.createElement("div");
    if (numArticles%2 === 0){
        div1.setAttribute("class", "wow slideInUp item2");
    }
    else{
        div1.setAttribute("class", "wow slideInUp item");
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

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "display-4");
    h1.innerHTML = articleTitle;
    div2.appendChild(h1);

    var p = document.createElement("p");
    p.setAttribute("class", "lead");
    p.innerHTML = articleSummary;
    div2.appendChild(p);

    for (tag in tags){
        var span = document.createElement("span");
        span.setAttribute("class", "badge badge-primary");
        span.innerHTML = tag;
        div2.setAttribute(span);
    }

    numArticles++;

    parent.appendChild(div1);
}
