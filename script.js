let weather =
{
    "apiKey":"e70fdfb52a6df1aa5016aabe4ebdb35e",
    fetchWeather : function(city) 
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        +"&appid="
        + this.apiKey
       )
      .then((response) => 
        {
        return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather:function(data)
    {
       const {name} = data;
       const {description,icon} = data.weather[0];
       const {temp,humidity} = data.main;
       const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/"+icon +".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = (temp-273.15).toFixed(0) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "  km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search : function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button"),addEventListener("click", function() {weather.search();});

document.querySelector(".search-bar").addEventListener("keyup",function(event)
{
    if(event.key=="Enter")
    {
        weather.search();
    }
});

weather.fetchWeather("Deoria");