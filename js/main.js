let params = {
  country: "SA",
  city: "Makka al Mukarramah"
}
let video = document.getElementById("video");
let city_name = document.getElementById("city-name");
let cities = [
  "مكة المكرمة","المدينة المنورة","القاهرة","الرياض"
]

let citySelect = document.getElementById("city");
for (let x= 0 ; x < cities.length ; x++){
  let option = document.createElement("option");
  option.innerHTML = cities[x];
  citySelect.appendChild(option);
}

citySelect.addEventListener("change",function(){
  if(this.value == "القاهرة"){
    params.country = "EG";
    params.city = "Cairo";
    city_name.innerHTML = this.value;
    video.src = "vid/cairo.mp4";
    showAzan()
  }else if(this.value == "مكة المكرمة"){
    params.country = "SA";
    params.city = "Makka al Mukarramah"
    video.src = "vid/makkah.mp4"
    city_name.innerHTML = this.value;
    showAzan()
  }else if(this.value == "المدينة المنورة"){
    params.country = "EG";
    params.city = "Al Madīnah al Munawwarah"
    city_name.innerHTML = this.value;
    video.src = "vid/madena.mp4";
    showAzan();
  }else if(this.value == "الرياض"){
    params.country = "SA";
    params.city = "Ar Riyāḑ";
    city_name.innerHTML = this.value;
    video.src = "vid/reyadh.mp4";
    showAzan();
  }
})
// const axios = require('axios/dist/browser/axios.cjs'); // browser
// const axios = require('axios/dist/node/axios.cjs'); // node
function showAzan(){
axios.get('http://api.aladhan.com/v1/timingsByCity', {
  params: params
})
  .then(function (response) {
    // handle success;

    let readableDate = response.data.data.date.readable;
    let weekDay = response.data.data.date.hijri.weekday.ar;
    document.getElementById("this-day").innerHTML = weekDay + readableDate;
    let cards = document.querySelector(".cards");
    cards.innerHTML =``
    for(let i = 1 ; i<=6 ;i++){
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML =`
      <div class="header">
      <h2 class= "head-${i}"></h2>
    </div>
    <div class="body">
      <h3 class="time-${i}">4:30</h3>
    </div>`
    cards.appendChild(card)
    }
    // fajr
    let fajrName = document.querySelector(".head-1");
    fajrName.textContent = "الفجر";
    let fajrTime = document.querySelector(".time-1");
    fajrTime.innerHTML = response.data.data.timings.Fajr;
    // sunrise
    let sunriseName = document.querySelector(".head-2");
    sunriseName.textContent = "الشروق";
    let sunriseTime = document.querySelector(".time-2");
    sunriseTime.innerHTML = response.data.data.timings.Sunrise;
    // dhuhr
    let dhuhrName = document.querySelector(".head-3");
    dhuhrName.textContent = "الظهر";
    let dhuhrTime = document.querySelector(".time-3");
    dhuhrTime.innerHTML = response.data.data.timings.Dhuhr;
    // asr
    let asrName = document.querySelector(".head-4");
    asrName.textContent = "العصر";
    let asrTime = document.querySelector(".time-4");
    asrTime.innerHTML = response.data.data.timings.Asr;
    // maghrib
    let maghribName = document.querySelector(".head-5");
    maghribName.textContent = "المغرب";
    let maghribTime = document.querySelector(".time-5");
    maghribTime.innerHTML = response.data.data.timings.Maghrib;
    // isha
    let ishaName = document.querySelector(".head-6");
    ishaName.textContent = "العشاء";
    let ishaTime = document.querySelector(".time-6");
    ishaTime.innerHTML = response.data.data.timings.Isha;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
showAzan()
