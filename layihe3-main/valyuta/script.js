const leftBtn = document.querySelectorAll(".btn-left button");
const rightBtn = document.querySelectorAll(".btn-right button");
const inputLeft = document.querySelector(".inputleft");
const inputRight = document.querySelector(".inputright");
let currency1 = "RUB";
let currency2 = "USD";
let hesab1=document.querySelector(".hesab1")
let hesab2=document.querySelector(".hesab2")

//left button
leftBtn.forEach((btnleft) => {
  btnleft.addEventListener("click", (e) => {
    currency1 = e.target.id;
    let btnParent = e.target.parentElement.children;
    for (let i = 0; i < btnParent.length; i++) {
      btnParent[i].classList.remove("active_btn");
    }
    e.target.classList.add("active_btn");
    fetch(
      `https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`
    )
      .then((res) => res.json())
      .then((data) => {
        let ratesValue = Object.values(data.rates);
        let ratesKey = Object.keys(data.rates);
        console.log(ratesValue);
console.log(currency1);
         console.log(ratesKey);
        inputRight.value = ratesValue * inputLeft.value;
 hesab1.innerHTML=`1 ${currency1} = ${ratesValue} ${ratesKey}`
   hesab2.innerHTML=`1 ${ratesKey} = ${ratesValue} ${currency1}`


      });
  });
});

//right button
rightBtn.forEach((btnright) => {
  btnright.addEventListener("click", (e) => {
    currency2 = e.target.id;
    let btnParent = e.target.parentElement.children;
    for (let i = 0; i < btnParent.length; i++) {
      btnParent[i].classList.remove("active_btn");
    }
    e.target.classList.add("active_btn");
    fetch(
      `https://api.exchangerate.host/latest?base=${currency2}&symbols=${currency1}`
    )
      .then((res) => res.json())
      .then((data) => {
        let ratesValue = Object.values(data.rates);
        let ratesKey = Object.keys(data.rates);
        inputLeft.value = ratesValue * inputRight.value;
        console.log(ratesValue);
        console.log(ratesKey);
        console.log(currency1);
         hesab2.innerHTML=`1 ${currency2} = ${ratesValue} ${ratesKey}`
         hesab1.innerHTML=`1 ${currency1} =${1/ratesValue} ${currency2} `
      
      });
  });
});

inputLeft.addEventListener("keyup", () => {
  fetch(
    `https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`
  )
    .then((res) => res.json())
    .then((data) => {
      let ratesValue = Object.values(data.rates);
      inputRight.value = ratesValue * inputLeft.value;
    });
});


inputRight.addEventListener("keyup", () => {
  fetch(
    `https://api.exchangerate.host/latest?base=${currency2}&symbols=${currency1}`
  )
    .then((res) => res.json())
    .then((data) => {
      let ratesValue = Object.values(data.rates);
      inputLeft.value = ratesValue * inputRight.value;
    });
});


fetch(`https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`).then(res=>res.json()).then(data=>
{        let ratesValue = Object.values(data.rates);

hesab1.innerHTML=`1 RUB = ${ratesValue} USD`

})
fetch(`https://api.exchangerate.host/latest?base=${currency2}&symbols=${currency1}`).then(res=>res.json()).then(data=>
{        let ratesValue = Object.values(data.rates);

hesab2.innerHTML=`1 USD = ${ratesValue} RUB`

})