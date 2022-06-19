import { postData, retrieveData } from "./app";
// get the lat, lon, and country from the geonames api
const getLocation = async function(city,date){
      
    let username = 'sultan_razin';
    
    
    const dataUrl = 'http://api.geonames.org/' + 'searchJSON?formatted=true&q=' + city + '&username=' + username; 
    const res = await fetch(dataUrl);
    const text3 = await res.json()
    
    try{
        
   
        
        
        console.log(text3.geonames[0]);
        getWeather(text3.geonames[0].lat,text3.geonames[0].lng, date)
        getPicture(city);
        return text3.geonames[0].countryName;
            
    }
    catch(error){
        console.log(error);
    }
}
// get information about the country using the restcountries api
const getCountryData = async function(country){
    const res = await fetch('https://restcountries.com/v3.1/name/'+country+'?fullText=true')
    const text = await res.json()

    try{
        console.log(text[0]);
        document.getElementById('destination').innerHTML += country+' is in '+text[0].region;
    }
    catch(error){
        console.log(error);
    }
}

let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();
const APIkey = '25a210406282456bbdec4d7e53be57bb';

// get the weather forecast using the weatherbit api
const getWeather = async function(lat,lon,date){
    
    // if it's in 7 days or less will serve the current weather
    // if it's in more than 7 days will serve the forecast for that specific day
    const diffTime = Math.abs(new Date(date) - new Date(newDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays > 7){
        const res = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?' + `lat=${lat}&lon=${lon}&key=` +APIkey)
        const text = await res.json()
        const ind = Math.min(diffDays-1,15);
        document.getElementById('weather').innerHTML = 'Typical for weather for then is: <br>'+text.data[ind].temp +' c <br>'+text.data[ind].weather.description;
    }
    else{
        
        const res = await fetch('https://api.weatherbit.io/v2.0/current?lat='+lat+'&lon='+lon+'&key='+APIkey)
        const text = await res.json()
        
        document.getElementById('weather').innerHTML = 'Typical weather for then is: <br>'+text.data[0].temp +' c <br>'+text.data[0].weather.description;
    }
    try{
        
        console.log(newDate);
        
    }
    catch(error){
        console.log(error);
    }
}

// search pixabay library of pics for a picture of the destination
const getPicture = async function(city){
    const res = await fetch('https://pixabay.com/api/?key=28131651-a8dc699f2fa4c50ecfd2f812e&q='+city+'&image_type=photo&pretty=true');
    const text = await res.json();

    try{
        
        const img = document.getElementById('image');
        img.setAttribute('src',text.hits[0].previewURL)
    }
    catch(error){
        console.log(error);
    }
}
// this method will be called when the submit button is clicked
// it'll call the rest of the methods and change the UI
const handleSubmit = async function(event) {
    event.preventDefault();
    
    
    // // check what text was put into the form field
    let formText = document.getElementById('City').value
    let date = document.getElementById('date').value
    const contry =  await getLocation(formText,date);
    document.getElementById('destination').innerHTML = 'My trip to: '+formText+'<br> Departing: '+date +'<br>';
    getCountryData(contry);
    
}
    
    
    
    
    
    
    
// this method will be called when the save trip button is clicked
// it'll invoke the postData func in the app.js
function saveTrip(){
    let formText = document.getElementById('City').value
    let date = document.getElementById('date').value
    let teset = {city:formText,date:date};
    postData('/add',teset);
    retrieveData();
}

export { handleSubmit , saveTrip, getLocation,getWeather,getPicture}

