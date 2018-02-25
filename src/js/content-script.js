var sel = window.getSelection();
var range = sel.getRangeAt(0); 
var rect = range.getBoundingClientRect();
var dialogBox = document.createElement("get_suggestion");
/*styling*/
dialogBox.setAttribute("open", "open");


var selectionContents = range.extractContents();
var div = document.createElement("div");
var title  = document.createTextNode("TITLE:");
dialogBox.appendChild(title)
//get text values
var arr = ["text1", "text2", "text3", "text4", "text5"];
var t = [];
var elem = [];

for(var i = 0; i < arr.length; i++){
    t[i] = document.createTextNode(arr[i]);
    elem[i] = document.createElement("div");
    elem[i].appendChild(t[i]);
    dialogBox.appendChild(elem[i]);
    /*elem[i].addEventListener("click", function () {
        var text = document.createTextNode(arr[i] + " " + i);
        selectionContents.appendChild(text);
        div.appendChild(selectionContents);
        range.insertNode(div);
    });*/
}

elem[0].addEventListener("click", function () {
    var text = document.createTextNode("text0");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[1].addEventListener("click", function () {
    var text = document.createTextNode("text1");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[2].addEventListener("click", function () {
    var text = document.createTextNode("text2");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[3].addEventListener("click", function () {
    var text = document.createTextNode("text3");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[4].addEventListener("click", function () {
    var text = document.createTextNode("text4");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

div.appendChild(selectionContents);
range.insertNode(div);

document.body.appendChild(dialogBox);


function somethingreplace(wow){
		document.body.innerHTML = document.body.innerHTML.replace(wow, 'hi');
	}