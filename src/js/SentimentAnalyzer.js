/**
 * Sentiment Result Analyzer - Provides Feedback and Suggestions on user inputted information.
 *
 */

var timeCounter = 0;
var idleTime = 50;

const responses = {

    "positive": [
        {
            "surprise": [],
            "joy":	[]
        }
    ],
    "negative": [
        {
            "anger": [],
            "sadness": [],
            "fear":	[]
        }
    ],
    "negative--": [
        "Woah there! You may want to lighten things up a bit.",
        "It's sounding a bit grim don't you think? Try brightening things up?"
    ],
};


const toneFeedback = {

    "loudTone": ["Use a less powerful tone and use more subtle language"],
    "quietTone": ["Use a more powerful tone and use firmer, more confident language"],
    "appropriateTone": ["No suggestions"],
};

const emotionStrings = ["anger", "suprise", "sadness", "fear", "joy"]


switch (responses){
    case "anger" || "suprise":
        toneFeedback[loudTone];
        break;

    case "sadness" || "fear":
        toneFeedback[quietTone];
        break;

    default:
        toneFeedback[normalTone];
}

const suggestions = {

    "NoneTyped": ["You have not typed yet. Here are some suggestions."],
    "limitedTyped": ["You have not typed anything for a while. Based on how you have written so far, here are some suggestions."],
};

document.onclick = function(){
    timeCounter = 0;
}

window.setInterval(timeCheck, 100)
function timeCheck(){
    timeCounter++;
    if (document.addEventListener("keyup", function() {document.getElementById("sentence").value}, false))
        suggestions[NoneTyped];

    else {
        if (timeCounter > idleTime)
            suggestions[limitedTyped];
    }
}



//////////////////////////////////////////////////
/*sentimentList = [0.3, 0.2, 0.5, 0.8, 0.05, 0.08]
minThreshold = 0.1

for (i = 0; i < sentimentList.length; i++){
    if (sentimentList[i] > threshold) {
        return ("Positive sounding")
    }

    else {
        return("Negative Sounding")

        if (){

        }

        else {

        }
    }
}
*/