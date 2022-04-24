let from = document.getElementById('from');
let to   = document.getElementById('to');
let input = document.getElementById("input");
let result = document.getElementById("result");
let tableList = document.getElementById("tableList");
let tfoot = document.querySelector("tfoot");
let deleteBtn = document.getElementById("deleteBtn");


function Num(x) {
    return Number(x.replace(",",""))
}

function createOption(x,y,z) {
    let o = document.createElement('option');
    let t = document.createTextNode(y);
    o.appendChild(t);
    x.appendChild(o);
    o.setAttribute("value",Num(z))
}


for (x in data.rates) {
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x])
}

function createTable(x) {

    let tr = document.createElement("tr");
    let notData = document.getElementById("notData");
    if (notData) {
        notData.remove();
    }
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    tableList.appendChild(tr);


}

function storageData() {
    localStorage.setItem("record",tableList.innerHTML);
}

document.getElementById("calculate").addEventListener("submit",function (e) {
    e.preventDefault();
    let x = input.value;
    let y = from.value;
    let z = to.value;

    const first = x*y;
    const fromResult = x+" "+from.options[from.selectedIndex].innerHTML;
    const toResult = to.options[to.selectedIndex].innerHTML;
    const date = new Date().toLocaleDateString();
    const second = first/z;
    const showResult = second.toFixed(2);
    const array = [date,fromResult,toResult,showResult];

    result.innerHTML= showResult;
    input.value = "";
    input.focus();
    from.value  = "head";
    to.value    = "1";
    let dataArr = createTable(array);
    storageData(dataArr);
});

(function () {
    if (localStorage.getItem("record")) {
        tableList.innerHTML = localStorage.getItem("record");
    }
    else{
        tfoot.innerHTML =`<tr id="notData"><td colspan="4"><p>Data not found!</p></td></tr>`
    }
})();

deleteBtn.addEventListener("click",function () {
        localStorage.clear();
        tableList.remove();
        tfoot.innerHTML =`<tr id="notData"><td colspan="4"><p>Data not found!</p></td></tr>`;
        result.innerHTML = `00.0`;
})

function changeMod() {
    document.body.classList.toggle("night-mode");
    document.getElementById("sun").classList.toggle("fa-sun")
}