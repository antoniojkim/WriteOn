var sel = window.getSelection();
var range = sel.getRangeAt(0); 
var rect = range.getBoundingClientRect();
var dialogBox = document.createElement("DIALOG");
dialogBox.style.color = "rgb(155, 102, 102)";
dialogBox.style.position = 'absolute';
alert(rect.left.toString());
alert(rect.top.toString());
alert(rect.right);
alert(rect.bottom.toString());

dialogBox.style.right = ((rect.right / window.innerWidth) * 100) + '%';
dialogBox.style.bottom = ((rect.bottom / window.innerHeight) * 100) + '%';
dialogBox.setAttribute("open", "open");


var selectionContents = range.extractContents();
var div = document.createElement("div");
var text = document.createTextNode("JESSUSSS");
div.appendChild(text);
div.appendChild(selectionContents);
range.insertNode(div);



//get text values
var arr = ["text1", "text2", "text3", "text4", "text5"];
var t = [];
var elem = [];

for(var i = 0; i < arr.length; i++){
    t[i] = document.createTextNode(arr[i]);
    elem[i] = document.createElement("div");
    elem[i].appendChild(t[i]);
    dialogBox.appendChild(elem[i]);
}

elem[0].addEventListener("click", function () {
    alert("clicked on text1!");
});

elem[1].addEventListener("click", function () {
    alert("clicked on text2!");
});

elem[2].addEventListener("click", function () {
    alert("clicked on text3!");
});

elem[3].addEventListener("click", function () {
    alert("clicked on text4!");
});

elem[4].addEventListener("click", function () {
    alert("clicked on text5!");
});


document.body.appendChild(dialogBox);