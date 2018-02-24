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

function appendWord(text, previous, iteration){

    // var client = new HttpClient();
    // client.get("https://api.datamuse.com/words?lc="+previous+"", function(response) {
    //     var word = response[0]["word"];
    //     if (iteration > 0){
    //         appendWord(text+" "+word, word, iteration-1);
    //     }
    //     else{
    //         console.log(text);
    //     }
    // });

    $.ajax({
        url: "https://api.datamuse.com/words?lc="+previous+"",
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (response) {
            // console.log(response[0]);
            var word = response[0]["word"];
            if (iteration > 0){
                if (word !== "."){
                    appendWord(text+" "+word, word, iteration-1);
                }
                else{
                    console.log(text+word);
                }
            }
            else{
                console.log(text+" "+word);
            }
        },
        error: function () {
            console.log("error");
        }
    });
}

appendWord("It was", "was", 10);

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
