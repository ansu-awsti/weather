document.addEventListener('DOMContentLoaded',() =>{
const cityInput = document.getElementById("city-input");
const getWeatherbtn=document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameDisplay = document.getElementById("city-name");
const temperatureDisplay = document.getElementById("temperature");
const description = document.getElementById("description");
const Errormessage = document.getElementById("error-message");
const Api_key = "58ef8a2515d59631f7c962cc8abf2f1f";//env variables

getWeatherbtn.addEventListener('click', async () =>{
   const city= cityInput.value.trim();
    if(!city) return;
    try{
        const weatherData = await fetchweatherdata(city);
        displayweatherdata(weatherData);
    }
    catch(error){
        showerror();
    }

});
async function fetchweatherdata (city){
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_key}`;
const res=await fetch (url);
console.log(typeof res);
console.log("response",res);
if(!res.ok)
{
    throw new error("city not found");
}
const data =  await res.json();
return data;
}
function displayweatherdata(weatherdata){
    console.log(weatherdata);
    const {name,main,weather}=weatherdata;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent =`Temperature: ${main.temp}`;
    description.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    Errormessage.classList.add('hidden');
   
}
function showerror(){
    weatherInfo.classList.add('hidden');
    Errormessage.classList.remove('hidden');
}

});