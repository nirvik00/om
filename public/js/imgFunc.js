window.onload = function () {
    var elem = document.getElementsByClassName("exec");
    var num = 0;
    for (var i = 0; i < elem.length; i++) {
        //elem.item(i).onclick = clickerFn (i);
        num++;
    }
    console.log(num);
}

function clickerFn(path) {
    console.log(path);
    let ele = document.getElementById("floatingDiv");
    ele.style.display = 'block';
    addImage(ele, path);
    addButtons(ele);
}

function addImage(ele, path) {
    // check for too many end buttons
    var delitems = document.getElementsByClassName("dynamicImage");
    for (let i = 0; i < delitems.length; i++) {
        delitems[i].remove();
    }
    var imgF = document.createElement("img");
    imgF.setAttribute('src', path);
    imgF.setAttribute("width", "50%");
    imgF.setAttribute("height", "auto");
    imgF.className = "dynamicImage";
    ele.appendChild(imgF);
}

function addButtons(ele) {

    console.log('div opened');

    // check for too many end buttons
    var delitems = document.getElementsByClassName("closeme");
    for (let i = 0; i < delitems.length; i++) {
        delitems[i].remove();
    }

    //add and handle end button
    let endbtn = document.createElement("BUTTON");
    endbtn.className = "closeme";
    endbtn.innerHTML = "CLOSE USER INTERFACE";
    endbtn.style.marginTop = "12px";
    endbtn.style.marginLeft = "20px";

    ele.appendChild(endbtn);
    endbtn.addEventListener('click', function () {
        ele.style.display = 'none';
    });
}