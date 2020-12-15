import apikey from './apikey.js';
import ccapikey from './apikey.js';

/*
const searchButton = document.querySelector('#searchButton');
const searchCoordinates = document.querySelector('#searchCoordinates');
const searchInputField = document.querySelector('#searchInputField');
const testParagraph = document.querySelector('#testParagraph');
const latValue = document.querySelector("#searchLat");
const lonValue = document.querySelector("#searchLong");
*/

//urls for climacell
const url_CClat = '?lat=';
const url_CClon = '&lon=';

//Next 5 days
const url_CCNext5 = 'https://api.climacell.co/v3/weather/forecast/daily';
const url_CCdefaultTest = '&unit_system=si&start_time=now&fields=precipitation_accumulation%2Ctemp%2Cwind_speed&apikey=';

//apikey
const CCAPI_key = ccapikey;

//for climacell API using long and lat
const searchCoordinatesButtonPressed = async () => {
  let Next5Data = await fetchNext5DaysForcast(); 
  //let Last5Data = await fetchNext5DaysForcast();
  //testParagraph.innerHTML = JSON.stringify(Next5Data);

  RD0.innerHTML = Math.round(Next5Data[0].precipitation_accumulation.value *  100)/100;
  
  TD0.innerHTML = Next5Data[0].temp[0].min.value + " - " + Next5Data[0].temp[1].max.value;
  WD0.innerHTML = Next5Data[0].wind_speed[0].min.value + " - " + Next5Data[0].wind_speed[1].max.value;

  RD1.innerHTML = Math.round(Next5Data[1].precipitation_accumulation.value *  100)/100;
  
  RD2.innerHTML = Math.round(Next5Data[2].precipitation_accumulation.value *  100)/100;
  RD3.innerHTML = Math.round(Next5Data[3].precipitation_accumulation.value *  100)/100;
  RD4.innerHTML = Math.round(Next5Data[4].precipitation_accumulation.value *  100)/100;
  RD5.innerHTML = Math.round(Next5Data[5].precipitation_accumulation.value *  100)/100;
}

//The bandwidth used by this function can be reduced by 
//specifying an end time and not calling temp and wind speed when not required
const fetchNext5DaysForcast = async () => {
  try{        
    const response = await fetch(url_CCNext5 + url_CClat + searchLat.value + url_CClon + searchLong.value + url_CCdefaultTest + CCAPI_key);
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

const fetchLast5DaysForcast = async () => {

}

//For hourly forcast 
const fetchTodaysForcast = async () => {

}

//urls for DataPoint
const url_sitelist = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=';
const url_forcasts = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/';

const api_key = apikey;

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
