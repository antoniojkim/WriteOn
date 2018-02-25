
const responses = {
    "positive": {
        "surprise": [
            "It sounds like you were surprised by something. Why don't you talk more about that?"
        ],
        "joy":	[
            "If I'm not mistaken, you seem happy! Glad to see it is showing in your writing."
        ],
        "mixed": [
            "I'm getting mixed messages from your writing. If this isn't what you intended, try making yourself more clear."
        ]
    },
    "negative": {
        "anger": [
            "You sound like your getting angry. If you didn't really mean to, try going back and revising your writing."
        ],
        "sadness": [
            "Why so glum, chum? You're writing as if something's got you down. There's nothing wrong with that. Just make sure you don't get carried away..."
        ],
        "fear":	[
            "Is that supposed to sound scary? If so, I like it! If not, try to take it down a notch."
        ],
        "mixed": [
            "You're giving off both a positive and negative vibe. If this isn't what you intended, try making yourself more clear."
        ]
    },
    "negative--": [
        "Woah there! You may want to lighten things up a bit.",
        "It's sounding a bit grim don't you think? Try brightening things up?"
    ]
};

function getRandomItem(list){
    return list[Math.floor(Math.random()*list.length)];
}

const emotionStrings = ["anger", "surprise", "sadness", "fear", "joy"];

function getSuggestion(){
    var response = getResponse();
    console.log(generateSuggestion(response));
}

function generateSuggestion(response){
    const emotions = multivariateRegression(response, "emotion");
    var strongestEmotion = emotionStrings[0];
    var emotionValue = emotions[0];
    for (i = 1; i < emotions.length; ++i){
        if (emotions[i] > emotionValue){
            strongestEmotion = emotionStrings[i];
            emotionValue = emotions[i];
        }
    }

    const sentiment = sentimentRegression(response);
    if (sentiment < 0.1){
        return getRandomItem(responses["negative--"]);
    }
    else if (strongestEmotion === "Surprise" || strongestEmotion === "Joy"){ //positive emotions
        if (sentiment >= 0.5){ // positive sentiments
            return getRandomItem(responses["positive"][strongestEmotion]);
        }
        else{ //negative sentiments
            return getRandomItem(responses["positive"]["mixed"]);
        }
    }
    else{ //negative emotions
        if (sentiment >= 0.5){ // positive sentiments
            return getRandomItem(responses["negative"]["mixed"]);
        }
        else{ //negative sentiments
            return getRandomItem(responses["negative"][strongestEmotion]);
        }
    }
}



