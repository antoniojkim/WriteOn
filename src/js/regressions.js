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