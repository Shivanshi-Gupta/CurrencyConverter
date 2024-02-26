//use flagsapi.com for img of all country flags
const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdownSel=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let sel of dropdownSel){        // to & from
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (sel.name==="from" && currCode==="USD")
        newOption.selected="selected";
        else if (sel.name==="to" && currCode==="INR")
        newOption.selected="selected";
        sel.append(newOption);
    }
    sel.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchangeRate= async ()=>{
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if (amtVal==="" || amtVal==="1"){
        amtVal=1;
        amt.value="1";
    }
    const URL =`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
};
const updateFlag=(element)=>{
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); //all default things like refreshing pg is removed
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})
