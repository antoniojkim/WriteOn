/**Find Nouns, Adjectives, and
 *
 * @type {XMLHttpRequest}
 */

var nounsList = []
var adjectivesList = []
var verbsList = []

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var request = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(request.responseText);
        };

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
};

// Call the above code asynchronously - provide a call back to the above code
function getNouns(text, prev, iteration){
    $.ajax({
        url: "https://api.datamuse.com/words?lc="+prev+"&md = p",
        method: "GET",
        dataType: "json",

        success: function (response) {
            if (iteration > 0) {

                var word = response[0]["word"]

                for (i = 0; i < 5; i++) {

                    nounsList.push(response[i]["word"])
                    console.log(response[i]["word"])

                }

                getNouns(text + word, word, iteration - 1)
            }
        },

        error: function () {
            console.log("error");
        }
    });
}

function evaluateNouns(text) {
    $.ajax({
        type: "POST",
        url: 'https://apiv2.indico.io/sentiment',
        dataType: "json",
        success: $.post(
            'https://apiv2.indico.io/sentiment',
            JSON.stringify({
                'api_key': "d10eddda1d5a5ce1ac8b4a86ba2526f9",
                'data': [
                    ""+text+"",
                ]
            })
        ).then(function (res) {
            console.log(res)
        }),
    });

}


getNouns ("I strongly like", "like", 3);

for (n = 0; n < nounsList.size; n++){
    evaluateNouns(nounsList[n])
}
