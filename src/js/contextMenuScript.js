var dialogBox = document.createElement("DIALOG");
dialogBox.style.color = "rgb(155, 102, 102)";
dialogBox.style.position = 'absolute';
dialogBox.style.right = null;
dialogBox.style.left = 110;
dialogBox.setAttribute("open", "open");
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
    
});

elem[1].addEventListener("click", function () {
    
});

elem[2].addEventListener("click", function () {
    
});

elem[3].addEventListener("click", function () {
    
});

elem[4].addEventListener("click", function () {
    
});


document.body.appendChild(dialogBox);