/**
 * Created by Antonio on 2018-02-24.
 */
console.log("trying to generate sentences...");


var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
};


function splitSentences(text){
    var sentences = text.split(".");
    for (i = 0; i<sentences.length; ++i){
        sentences[i] = sentences[i].trim()+".";
    }
    return sentences.slice(0, sentences.length-1);
}

function indicoAnalysis(){
    var text = "Last year was the first time I had ever been the new kid at school. For the first four days, I was completely alone. I don’t think I even spoke to a single person. Finally, at lunch on the fifth day, Karen Watson walked past her usual table and sat down right next to me. Even though I was new, I had already figured out who Karen Watson was. She was popular. Pretty soon, all of Karen’s friends were sitting there right next to me. I never became great friends with Karen, but after lunch that day, it seemed like all sorts of people were happy to be my friend. You cannot convince me that Karen did not know what she was doing. I have a great respect for her, and I learned a great deal about what it means to be a true leader.";
    var sentences = splitSentences(text);
    // $.post(
    //     'https://apiv2.indico.io/apis/multiapi/batch?apis=sentimenthq,texttags,keywords,people,places,organizations,personality,emotion',
    //     JSON.stringify({
    //         'api_key': "952364b8a091bc91909e184032396897",
    //         'data': sentences
    //     })
    // ).then(function(res) { console.log(res) });
}


// $.post(
//     'https://apiv2.indico.io/sentiment/batch',
//     JSON.stringify({
//         'api_key': "952364b8a091bc91909e184032396897",
//         'data': [
//             "I hope we win something at Hack the Valley."
//         ]
//     })
// ).then(function(res) { console.log(res) });

//{"results": [0.8577786907]}
