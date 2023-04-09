const calcScreen = document.querySelector("input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
document.querySelector(".koma").addEventListener("click",komaClick)
document.querySelector(".ac").addEventListener("click",acClick)
document.querySelector(".equals").addEventListener("click",equalClick);
let now=[""];
let i=0;
let val=[];
let lastNow=[];

numbers.forEach(
    function (number){
        number.addEventListener("click",numberClick);
    }
)

operators.forEach(
    function (operator){
        operator.addEventListener("click",operatorClick);
    }
)

function numberClick(e){
    if((now[i]==="" && e.target.value==="0") || now[i].toString().indexOf("%")>-1){
        return;
    }
    if(e.target.value==="%"){
        if(now[i].slice(-1)==="."){
            now[i]=now[i].slice(0,-1);
        }
    }
    now[i] += e.target.value;
    calcScreen.value=now.join("");
    console.log(now)
}

function komaClick(e){
    if(now[i].toString().indexOf(".")>-1 || now[i].indexOf("%")>-1){
        return;
    }
    if(now[i]===""){
        now[i]=0;
    }
    now[i] += e.target.value;
    calcScreen.value=now.join("");
    console.log(now)
}

function operatorClick(e){
    //handle bila element now terakhir adalah sebuah operator
    if(now[i]===""){
        if(i>0){
            now.splice(-2);
            i-=2;
        }else{
            now[i]=0;
        }
    }

    now.push(e.target.value);
    now.push("");
    i+=2;
    calcScreen.value=now.join("");
    console.log(now)
}

function acClick(){
    now=[""];
    val=[];
    i=0;
    calcScreen.value=0;
}

function equalClick(){
    //handle bila element now terakhir adalah sebuah operator
    if(now[i]===""){
        if(i>0){
            now.splice(-2);
            i-=2;
        }else{
            return;
        }
    }

    //handle tanda persen
    for(let x=0; x<now.length; x++){
        now[x]=now[x].toString();
        if(now[x].indexOf("%")>-1){
            if(now[x-1]==="/" || now[x-1]==="*" || now[x+1]==="/" || now[x+1]==="*" ||now[x-1]===undefined){
                now[x]=now[x].slice(0,-1)/100;
            }
            console.log(now)
        }
    }

    //menggunakan eval untuk menemukan result dengan mudah
    //console.log(eval(now.join("")));

    //merubah a-b menjadi a+(-b)
    for(let x=0; x<now.length;x++){
        if(now[x]==="-"){
            now[x]="+";
            now[x+1]="-"+now[x+1];
        }
    }
    console.log(now)
    
    //menggunakan cara manual untuk menemukan result
    while(now.includes("*")){
        for(let x=0;x<now.length;x++){
            if(now[x+1]==="*"){
                val.push(parseFloat(now[x])*parseFloat(now[x+2]));
                x+=2;
            }else{
                val.push(now[x]);
            }
        }
        console.log(val)
        now=val;
        val=[];
    }
    while(now.includes("/")){
        for(let x=0;x<now.length;x++){
            if(now[x+1]==="/"){
                val.push(parseFloat(now[x])/parseFloat(now[x+2]));
                x+=2;
            }else{
                val.push(now[x]);
            }
        }
        console.log(val)
        now=val;
        val=[];
    }

    while(now.includes("+")){
        for(let x=0;x<now.length;x++){
            if(now[x+1]==="+" && now[x].toString().indexOf("%")===-1 && now[x+2].toString().indexOf("%")===-1){
                val.push(parseFloat(now[x])+parseFloat(now[x+2]));
                x+=2;
            }else{
                val.push(now[x]);
            }
        }
        now=val;
        if(JSON.stringify(lastNow)===JSON.stringify(now)){
            console.log("mulai penjumlahan persen")
            for(let x=0; x<now.length; x++){
                if(now[x].toString().includes("%")){
                    now[x]=now[x].slice(0,-1);
                    now[x]=now[x-2]*now[x]/100;
                }
            }
            console.log(now);
        }
        lastNow=val;
        val=[];
        console.log(now);
        
    }
    calcScreen.value=now;
    i=0;
}