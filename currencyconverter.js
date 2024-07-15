const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns=document.querySelectorAll(".dropdown select");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");

for (let select of dropdowns){
    for (let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        
    if (select.name=="from" && code=="USD"){
        newOption.selected="selected";
    }
    else if (select.name=="to" && code=="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);

}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}


const updateFlag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}


btn=document.querySelector("button");

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval=="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value,tocurr.value);
    let newurl = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;  
    let response=await fetch(newurl);
    let data= await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamt = amtval*rate;
    console.log(finalamt);
    msg.innerText=`${amtval} ${fromcurr.value}=${finalamt} ${tocurr.value}`
})







