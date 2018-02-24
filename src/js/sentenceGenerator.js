/**
 * Created by Antonio on 2018-02-24.
 */

function appendWord(text, previous, iteration){

    $.ajax({
        url: "https://api.datamuse.com/words?lc="+previous+"&rel_bga="+previous,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (response) {
            // console.log(response[0]);
            var word1 = response[0]["word"];
            var word2 = response[1]["word"];
            if (iteration > 0){
                if (word1 !== "."){
                    appendWord(text+" "+word1, word1, iteration-1);
                }
                else{
                    console.log(text+word1);
                }
                if (word2 !== "."){
                    appendWord(text+" "+word2, word2, iteration-1);
                }
                else{
                    console.log(text+word2);
                }
            }
            else{
                console.log(text+" "+word1);
                console.log(text+" "+word2);
            }
        },
        error: function () {
            console.log("error");
        }
    });
}

function generateSentence(){

}