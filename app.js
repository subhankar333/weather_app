// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "9399278bfd50b085a715eba7e71402d3",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}


const searchInputBox = document.getElementById('input-box');

// eventlistener function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather_body').style.display = "block";
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// get weather report

// show weather report
function showWeatherReport(weather) {
    console.log(weather);

    let city_name = document.getElementById('city');
    city_name.innerText = `${weather.name} , ${weather.sys.country}`;

    let temp = document.getElementById('temparature');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let min_max_temp = document.getElementById('min-max');
    min_max_temp.innerHTML = `${Math.round(weather.main.temp_max)}&deg;C(max) / ${Math.round(weather.main.temp_max)}&deg;C(min)`;

    let weather_type = document.getElementById('isCloud');
    weather_type.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weather_type.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }else if(weather_type.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
    }else if(weather_type.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    } else if(weather_type.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rainy.jpg')";
    }else if(weather_type.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }else if(weather_type.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunder.jpg')";
    }else if(weather_type.textContent == 'Smoke'){
        document.body.style.backgroundImage = "url('images/smoke.jpg')";
    }

}

// manage dt and time
function dateManage(datearg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "June", "July", "August", "September", "Ocober", "November", "December", "May"];

    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()];
    let date = datearg.getDate();
    let day = days[datearg.getDay()];

    return `${day} , ${date} ${month} , ${year}`;
}
