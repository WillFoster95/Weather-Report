import apikey from './apikey.js';
import ccapikey from './apikey.js';

const searchButton = document.querySelector('#searchButton');
const searchInputField = document.querySelector('#searchInputField');
const testParagraph = document.querySelector('#testParagraph');
const latValue = document.querySelector("#searchLat");
const lonValue = document.querySelector("#searchLong");

//urls for climacell
const url_CCforcast = 'https://api.climacell.co/v3/weather/forecast/daily';
const url_CClat = '?lat=';
const url_CClon = '&lon=';
const url_CCdefaultTest = '&unit_system=si&start_time=now&fields=precipitation&apikey='

const CCAPI_key = ccapikey;

//urls for DataPoint
const url_sitelist = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=';
const url_forcasts = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/';

const api_key = apikey;

//for climacell API using long and lat
const searchCoordinatesButtonPressed = async () => {
  try{        
    const response = await fetch(url_CCforcast + url_CClat + latValue.value + url_CClon + lonValue.value + url_CCdefaultTest + CCAPI_key);
    if (response.ok){
      const jsonResponse = await response.json();
      testParagraph.innerHTML = JSON.stringify(jsonResponse);
             
      //return jsonResponse;
    }
    throw new Error('Request failed!')
  }
  catch(error){
    console.log(error);    
  }
}


//For Data Point API using place name (most of the code below here may not be used as ClimaCell seems better than DataPoint)
const searchButtonPressed = async () => {
  let rawLocationData = await fetchRawLocationData();
  let locationsArray = rawLocationData.Locations.Location
  let locationIndex = findLocationIndex(locationsArray);   
  let locationID = locationsArray[locationIndex].id;
  let locationForcasts = await fetchLocationForcastsByID(locationID);

  testParagraph.innerHTML = JSON.stringify(locationForcasts);

  //testParagraph.innerHTML = locationID;
  //console.log(locationIndex);
  //testParagraph.innerHTML = JSON.stringify(locationsArray[locationIndex]);
  //testParagraph.innerHTML = JSON.stringify(jsonResponse.Locations.Location);
}

//Returns a site list of all sties avaliable in the DataPoint API
const fetchRawLocationData = async () => {
    try{
      console.log(url_sitelist + api_key);      
      const response = await fetch(url_sitelist + api_key);
      if (response.ok){
        const jsonResponse = await response.json();
               
        return jsonResponse;
      }
      throw new Error('Request failed!')
    }
    catch(error){
      console.log(error);    
    }
}

//Finds the index of the location from the array of all locations in the DataPoint API
const findLocationIndex = (locationArray) => {
  for(let i = 0; i<locationArray.length; i++){
    if(locationArray[i].name == searchInputField.value){      
      return i;
    }
  }
  return "place not found";
}

//Returns location forcast by location ID from the DataPoint API
const fetchLocationForcastsByID = async (locationID) => {
  try{
    //console.log(url_forcasts + locationID + '?res=3hourly&key=' + api_key); 
    const response = await fetch(url_forcasts + locationID + '?res=3hourly&key=' + api_key);
    if (response.ok){
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request failed!')
  }
  catch(error){
    console.log(error);    
  }

}

searchButton.addEventListener('click', searchButtonPressed);
searchCoordinates.addEventListener('click', searchCoordinatesButtonPressed);
