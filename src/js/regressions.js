/**
 * Created by Antonio on 2018-02-24.
 */

function datamuseAPI(params, callback){
    $.ajax({
        url: "https://api.datamuse.com/words?"+params+"&md=p",
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function(response) { callback(response) },
        error: function () { console.log("error"); }
    });
}

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

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function extractKeywords(response){
    var results = response["results"]["keywords"]["results"];
    var keywords = [];
    var confidences = [];
    for (i = 0; i<results.length; ++i){
        Object.keys(results[i]).forEach(function(key){
            const j = i;
            datamuseAPI("sp="+key, function(res){
                if (res[0] !== undefined && res[0]["tags"] !== undefined &&
                    res[0]["tags"].contains("n") && !res[0]["tags"].contains("prop")){
                    if (keywords.length === 0){
                        keywords.push(key);
                        confidences.push(results[j][key]);
                    }
                    else if (results[j][key] > confidences[0]){
                        if (keywords.length === 1){
                            keywords.push(key);
                            confidences.push(results[j][key]);
                        }
                        else if (results[j][key] > confidences[1]){
                            keywords[0] = keywords[1];
                            confidences[0] = confidences[1];
                            keywords[1] = key;
                            confidences[1] = results[j][key];
                        }
                        else{
                            keywords[0] = key;
                            confidences[0] = results[j][key];
                        }
                    }
                    else if (keywords.length === 1){
                        keywords.push(keywords[0]);
                        confidences.push(confidences[0]);
                        keywords[0] = key;
                        confidences[0] = results[j][key];
                    }
                }
            });
        });
    }
    return keywords;
}

function extractTextTags(response){
    var results = response["results"]["texttags"]["results"];
    var tags = [];
    var confidences = [];
    for (i = 0; i<results.length; ++i){
        Object.keys(results[i]).forEach(function(key){
            if (tags.length === 0){
                tags.push(key);
                confidences.push(results[i][key]);
            }
            else if (results[i][key] > confidences[0]){
                if (tags.length === 1){
                    tags.push(key);
                    confidences.push(results[i][key]);
                }
                else if (results[i][key] > confidences[1]){
                    tags[0] = tags[1];
                    confidences[0] = confidences[1];
                    tags[1] = key;
                    confidences[1] = results[i][key];
                }
                else{
                    tags[0] = key;
                    confidences[0] = results[i][key];
                }
            }
            else if (tags.length === 1){
                tags.push(tags[0]);
                confidences.push(confidences[0]);
                tags[0] = key;
                confidences[0] = results[i][key];
            }
        });
    }
    return tags;
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
    // var keywords = extractKeywords(response);
    // console.log(keywords);
    var tags = extractTextTags(response);
    for (i = 0; i<2 && params.length < 2; ++i){
        tags[i] = tags[i].replace(" ", "+");
        if (sentiment >= 0.5){
            params.push("positive+news+"+tags[i]);
        }
        else{
            params.push("negative+news+"+tags[i]);
        }
    }
    console.log(params);
    return params;
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