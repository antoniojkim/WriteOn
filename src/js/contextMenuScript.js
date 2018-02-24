var sel = window.getSelection();
var range = sel.getRangeAt(0); 
var rect = range.getBoundingClientRect();
var dialogBox = document.createElement("DIALOG");

dialogBox.style.color = "rgb(155, 102, 102)";
dialogBox.style.position = 'absolute';

dialogBox.style.left = ((rect.left / window.innerWidth) * 100) + '%';
dialogBox.style.top = ((rect.top / window.innerHeight) * 100) + '%';
dialogBox.setAttribute("open", "open");


var selectionContents = range.extractContents();
var text = selectionContents.textContent;
var div = document.createElement("div");

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
   /* var textToAdd = document.createTextNode("text0");
    selectionContents.appendChild(text);
    div.appendChild(selectionContents);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);*/

    //temporary until we add custom phrasing/sentences/etc.
    var textToAdd = document.createTextNode(text + " " + "text0");
    div.appendChild(textToAdd);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[1].addEventListener("click", function () {
    var textToAdd = document.createTextNode(text + " " + "text1");
    div.appendChild(textToAdd);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[2].addEventListener("click", function () {
    var textToAdd = document.createTextNode(text + " " + "text2");
    div.appendChild(textToAdd);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[3].addEventListener("click", function () {
    var textToAdd = document.createTextNode(text + " " + "text3");
    div.appendChild(textToAdd);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

elem[4].addEventListener("click", function () {
    var textToAdd = document.createTextNode(text + " " + "text4");
    div.appendChild(textToAdd);
    range.insertNode(div);
    dialogBox.parentNode.removeChild(dialogBox);
});

//div.appendChild(selectionContents);
range.insertNode(div);

document.body.appendChild(dialogBox);