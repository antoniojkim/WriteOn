/**
 * Created by Antonio on 2018-02-24.
 */


function sentimentRegression(response, output){
    var y = response["results"]["sentimenthq"]["results"];
    var x = [];
    for (i = 0; i<y.length; ++i){
        x.push(i);
    }
    const regression = new ML.SimpleLinearRegression(x, y);
    const prediction = regression.predict(10);

    if (output !== undefined){
        output(regression, prediction);
    }
    return prediction;
}

function multivariateRegression(response, result, output){
    var results = response["results"][result]["results"];
    var x = [];
    var y = [];
    for (i = 0; i<results.length; ++i){
        var y_ = [];
        Object.keys(results[i]).forEach(function(key){
            y_.push(results[i][key]);
        });
        x.push([i]);
        y.push(y_);
    }
    // console.log(x);
    // console.log(y);

    const mlr = new ML.MultivariateLinearRegression(x, y);
    const prediction = mlr.predict([10]);
    if (output !== undefined){
        output(prediction);
    }
    return prediction;
}

function getStrongestEmotion(response){
    const emotions = multivariateRegression(response, "emotion");
    var strongestEmotion = emotionStrings[0];
    var emotionValue = emotions[0];
    for (i = 1; i < emotions.length; ++i){
        if (emotions[i] > emotionValue){
            strongestEmotion = emotionStrings[i];
            emotionValue = emotions[i];
        }
    }
    return strongestEmotion;
}

function extractPlace(response){
    var results = response["results"]["places"]["results"];
    var place = null;
    var confidence = 0;
    for (i = 0; i<results.length; ++i){
        for (j = 0; j<results[i].length; ++j){
            if (results[i][j]["confidence"] > confidence){
                place = results[i][j]["text"];
                confidence = results[i][j]["confidence"];
            }
        }
    }
    return place;
}
function extractOrganization(response){
    var results = response["results"]["organizations"]["results"];
    var organization = null;
    var confidence = 0;
    for (i = 0; i<results.length; ++i){
        for (j = 0; j<results[i].length; ++j){
            if (results[i][j]["confidence"] > confidence){
                organization = results[i][j]["text"];
                confidence = results[i][j]["confidence"];
            }
        }
    }
    return organization;
}

function getNewsSearchParams(){
    var response = getResponse();
    const sentiment = sentimentRegression(response);
    // const strongestEmotion = getStrongestEmotion(response);
    var params = [];
    var place = extractPlace(response);
    if (place !== null){
        place = place.replace(" ", "+");
        if (sentiment >= 0.5){
            params.push("positive+news+"+place);
        }
        else{
            params.push("negative+news+"+place);
        }
    }
    var organization = extractOrganization(response);
    if (organization !== null){
        organization = organization.replace(" ", "+");
        if (sentiment >= 0.5){
            params.push("positive+news+"+organization);
        }
        else{
            params.push("negative+news+"+organization);
        }
    }
    console.log(params);
    return params;
}

function textTagAnalysis(response){
    var texttags = response["results"]["texttags"]["results"];
    var maxtag = "";
    var maxval = 0;
    for (i = 0; i < texttags.length; ++i){
        Object.keys(texttags[i]).forEach(function(key){
            if (texttags[i][key] > maxval){
                maxtag = key;
                maxval = texttags[i][key];
            }
        });
    }
    console.log(maxtag);
    console.log(maxval);
}

function runRegressions(){
    var response = getResponse();
    console.log(response);
    sentimentRegression(response, function(regression, prediction){
        console.log("Sentiment Linear Regression Function:   "+regression.toString());
        console.log("Sentiment Linear Regression Predict at 10 = "+prediction);
    });
    multivariateRegression(response, "personality", function(personality){
        console.log("Personality Multivariate Regression Results:  " +
            "Openness: "+personality[0]+
            ", Extraversion: "+personality[1]+
            ", Agreeableness: "+personality[2]+
            ", Conscientiousness: "+personality[3]);
    });
    multivariateRegression(response, "emotion", function(emotion){
        console.log("Emotion Multivariate Regression Results:  " +
            "Anger: "+emotion[0]+
            ", Surprise: "+emotion[1]+
            ", Sadness: "+emotion[2]+
            ", Fear: "+emotion[3]+
            ", Joy: "+emotion[4]);
    });
    textTagAnalysis(response);
}