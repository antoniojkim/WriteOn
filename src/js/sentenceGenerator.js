/**
 * Created by Antonio on 2018-02-24.
 */

function appendWord(text, iteration, params, topics){

    if (params === undefined || params === null){
        var words = text.split(" ");
        params = "lc="+words[words.length-1];
    }
    if (topics !== undefined && topics !== ""){
        params += "&topics="+topics;
    }

    datamuseAPI(params, function (response) {
        // console.log(response[0]);
        for (i = 0; i<1; ++i){
            var word = response[i]["word"];
            if (iteration > 0 && word !== "."){
                params = "lc="+word;
                var tags = response[i]["tags"];
                if (tags !== undefined){
                    if (tags[0] === "adj"){
                        params = "rel_jja="+word;
                    }
                }
                appendWord(text+" "+word, iteration-1, params, topics);
            }
            else{
                // console.log(params);
                console.log((text+" "+word).replace(" .", "."));
            }
        }
    });
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function getTopics(){
    var peopleResults = getResponse()["results"]["people"]["results"];
    var people = [];
    for (i = peopleResults.length-1; i>=0; --i){
        if (peopleResults[i].length > 0){
            var person = peopleResults[i][0]["text"].toLowerCase();
            if (!people.contains(person)){
                people.push(person);
            }
        }
    }
    console.log(people);

    var keywordsResults = getResponse()["results"]["keywords"]["results"];
    var keywords = [];
    for (i = keywordsResults.length-1; i>=0; --i){
        Object.keys(keywordsResults[i]).forEach(function(key){
            if (!keywords.contains(key) && !people.contains(key)){
                keywords.push(key);
            }
        })
    }
    console.log(keywords);
    var topics = "";
    for (i = 0; i<5 && i<keywords.length; ++i){
        topics += ","+keywords[i];
    }
    return topics.slice(1);

}

function generateSentence(){
    var topics = getTopics();
    console.log(topics);

    var starters = ["This is a", "The"];

    var start = starters[Math.floor(Math.random()*starters.length)];
    appendWord(start, 7, null, topics)
}