var wow;
chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("input").innerHTML = selection[0];
    wow = selection[0];
});


function show_more(){
	var x = document.getElementById("more");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none"
    }
}
document.getElementById('showmore').addEventListener('click', show_more);



function b1(){
	console.log(wow)
	somethingreplace(wow);

}
document.getElementById('b1').addEventListener('click', b1);