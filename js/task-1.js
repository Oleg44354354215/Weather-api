// ✅
const KEY = 'd859261edefb44feaa3134747241612';
const URL = "http://api.weatherapi.com/v1";

const form = document.querySelector("form");
const list = document.querySelector(".js-list");

form.addEventListener("submit",getSearch);

function getSearch(e){
    e.preventDefault();

    const {city,days} = e.target.elements;
    
    sanRequest(city.value,days.value)
    .then(data =>{
        console.log(data);
        list.innerHTML = createMarup(data.forecast.forecastday, data.location.name)
    })
    .catch(error =>{
        console.log(error);
    })
    .finally(()=> e.target.reset())
    
}

function sanRequest(city = "",days=1){
    const params = new URLSearchParams({
        key:KEY,
        q:city,
        days,
        lang:"uk"
    })
    return fetch(`${URL}/forecast.json?${params}`)
    .then(res =>{
        if(!res.ok){
            throw new Error("ERROR");
        }
        return res.json();
    })
}

function createMarup(arr,cityName){
    return arr.map(({date, day :{avgtemp_c ,condition:{icon,text}}})=>`
    <li class="weather-card">
            <h2 class="weather">${cityName}</h2>
            <img src="${icon}" alt="${text}" class="weater-icon">
            <h2 class="weather-date">${date}</h2>
           <h3 class="weather-text">${text}</h3>
           <h3 class="temperature">${avgtemp_c} °C</h3>
       </li>
    
    `).join("")
}
// ✅
// form.addEventListener("submit",handleClick);

// function handleClick(e){
//     e.preventDefault();

//     const {city,days} = e.target.elements;

//     getWeather(city.value,days.value)
//     .then(data =>{
//         console.log(data);
//         list.innerHTML = createMarkup(data.forecast.forecastday)
        
//     })
//     .catch(error =>{
//         console.log(error);
//     })

// }

// function getWeather(city = "",days = 1){
//     const params = new URLSearchParams({
//         key:KEY,
//         q:city,
//         days,
//         lang:"uk"
//     })
//     return fetch(`${URL}/forecast.json?${params}`)
//     .then(res =>{
//         if(!res.ok){
//             throw new Error("oppppppss");
//         }
//         return res.json();
//     })
// }

// function createMarkup(arr){
//     return arr.map(({date, day:{avgtemp_c,condition :{text,icon}}}) => `
//         <li class="weather-card">
//             <img src="${icon}" alt="${text}" class="weater-icon">
//             <h2 class="weather-date">${date}</h2>
//             // <h3 class="weather-text">${text}</h3>
//             <h3 class="temperature">${avgtemp_c} °C</h3>
//         </li>
//         `).join("")
// };
