//DOM
var addBMI = document.querySelector('.btn');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem("BMIList")) || [];
var Height = document.querySelector('.inputHeight');
var Weight = document.querySelector('.inputWeight');
// var pageMain = document.querySelector('.pageMain');



//Event
//計算BMI並顯示
addBMI.addEventListener('click',calBMI);
updateBMI(data);

//Function
function calBMI(){
    //如果為空值，提醒輸入數字
    (function check(){
        if (document.querySelector('.inputWeight').value == "" || document.querySelector('.inputHeight').value == "") {
            alert("請輸入數字");
            BMIrecord = {};
        }
    })();
    
    const height = (parseInt(Height.value))/100;
    const weight = parseInt(Weight.value);
    const BMIvalue = (weight/(height*height)).toFixed(2);
    var color;
    var BMIstatus;
    switch(true) {
        case BMIvalue <= 18.5:
            BMIstatus = "過輕";
            color = "#31baf9";
            break;
        case 18.5 < BMIvalue && BMIvalue <=25:
            BMIstatus = "理想"
            color = "#86d73f";
            break;
        case 25 < BMIvalue && BMIvalue <=30:
            BMIstatus = "過重";
            color = "#ff982d";
            break;
        case 30 < BMIvalue && BMIvalue <=35:
            BMIstatus = "輕度肥胖";
            color = "#ff6c03";
            break;
        case 35 < BMIvalue && BMIvalue <=40:
            BMIstatus = "中度肥胖";
            color = '#ff6c03';
            break;
        case  40 < BMIvalue:
            BMIstatus = "重度肥胖"
            color = "#ff1200";
            break;
    }

    //獲得當前時間
    var today = new Date();
    var currentDate = 
    `${today.getFullYear()}/${(today.getMonth())+1}/${today.getDate()}`;

    //將計算結果存入一個物件中
    const BMIrecord = {
        BMI:BMIvalue,
        BMIstatus: BMIstatus,
        height: height,
        weight: weight,
        currentDate: currentDate,
        color: color
    };

    //將最新結果插入data中的第一個位置
    data.splice(0, 0, BMIrecord); 
    updateBMI(data);
    //需將data字串化才可存入localstorage
    localStorage.setItem('BMIList',JSON.stringify(data));
    
    //點擊計算BMI按鈕後，變更為Retry按鈕
    btnRetry(BMIrecord);
}



function updateBMI(data){
    var str = "";
    for(let i = 0; i < data.length; i++) {
        str += `
        <li data-index=${i} class="BMIlist" style="border-left:5px solid ${data[i].color};">
            <div class="BMIitems"><span class="bmi">${data[i].BMIstatus}</span></div> 
            <div class="BMIitems">BMI  <span class="bmi">${data[i].BMI}</span></div>
            <div class="BMIitems">身高  <span class="bmi">${data[i].height*100}</span> cm</div>
            <div class="BMIitems">體重  <span class="bmi">${data[i].weight}</span> kg</div>
            <div class="BMIitems">${data[i].currentDate}</div>
        </li>
        `;
    }
    list.innerHTML = str;
    //如果超過15項則清除
    // if (data.length > 10) {
    //     data.splice(9, data.length - 9);
    // }
}



function btnRetry(items){
    //先取得按鈕的父元素將addBMI移除，新增一個div元素並給他class(先行設定CSS)
    var getParent = addBMI.parentNode;
    getParent.removeChild(addBMI);
    var newDiv = document.createElement("div");
    newDiv.className = "showDiv" ;
    
    //將BMI的值印出不同顏色的border跟color
    str = `
    <p style="margin-top:40px"> ${items.BMI} </p>
    <p style = 'font-size: 14px;'>BMI</p>
    <a href="#" class="undo"><img src="icons_loop.png"></a>
    `;
    newDiv.innerHTML = str;
    newDiv.style.color = items.color;
    newDiv.style.border = `5px solid ${items.color}`;
    var newA = newDiv.querySelector("a"); 
    newA.style.backgroundColor = items.color;
    //將設定好的newDiv新增至getParent
    getParent.appendChild(newDiv); 

    //設置BMI狀態的文字欄位
    var BMItext = document.createElement("div");
    BMItext.className = "showStatus";
    var statusStr = `${items.BMIstatus}`;
    BMItext.innerHTML = statusStr;
    BMItext.style.color = items.color;
    getParent.appendChild(BMItext);

    //undo按鈕設置
    newDiv.addEventListener('click',function(e){
        if(e.target.nodeName !== "IMG"){return}
        else {
            Height.value = [];
            Weight.value = [];
            getParent.removeChild(newDiv);
            getParent.removeChild(BMItext);
            getParent.appendChild(addBMI);
        };
    });
}







    

   

