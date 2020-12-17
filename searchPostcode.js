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
const url_Next5Start = 'https://api.climacell.co/v3/weather/forecast/daily';
const url_Next5End = '&unit_system=si&start_time=now&fields=precipitation_accumulation%2Ctemp%2Cwind_speed&apikey=';

//Hourly
const url_HourlyStart = "https://api.climacell.co/v3/weather/forecast/hourly"
const url_HourlyEnd = "&unit_system=si&start_time=now&fields=precipitation%2Ctemp%2Cwind_speed%2Cwind_gust&apikey="

//apikey
const CCAPI_key = ccapikey;

//for climacell API using long and lat
const searchCoordinatesButtonPressed = async () => {
  var startTime = new Date();
  const Next5Data = fetchNext5DaysForcast();          
  const TodayData = fetchTodaysForcast();             
  //let Last5Data = await fetchLast5DaysForcast();
  //await Next5Data;
  //await TodayData;
  
  
  //Today
  displayTodayForcast(await Next5Data);
  
  //Next 5 days
  displayNext5Forcast(await Next5Data);

  //Hourly
  displayHourlyForcast(await TodayData);

  var endTime = new Date();
  var exeTime = endTime.getTime() - startTime.getTime();
  testParagraph.innerHTML = exeTime + "ms";

}

const displayNext5Forcast = (Next5Data) => {
  RD1.innerHTML = Math.round(Next5Data[1].precipitation_accumulation.value * 100)/100;
  RD2.innerHTML = Math.round(Next5Data[2].precipitation_accumulation.value * 100)/100;
  RD3.innerHTML = Math.round(Next5Data[3].precipitation_accumulation.value * 100)/100;
  RD4.innerHTML = Math.round(Next5Data[4].precipitation_accumulation.value * 100)/100;
  RD5.innerHTML = Math.round(Next5Data[5].precipitation_accumulation.value * 100)/100;
}

const displayTodayForcast = (Next5Data) => {
  RD0.innerHTML = Math.round(Next5Data[0].precipitation_accumulation.value * 100)/100; 
  TD0.innerHTML = Math.round(Next5Data[0].temp[0].min.value * 10)/10 + " - " + Math.round(Next5Data[0].temp[1].max.value * 10)/10;
  WD0.innerHTML = Math.round(Next5Data[0].wind_speed[0].min.value * 10)/10 + " - " + Math.round(Next5Data[0].wind_speed[1].max.value * 10)/10;
}

const displayHourlyForcast = (TodayData) => {
  RH0.innerHTML = Math.round(TodayData[0].precipitation.value * 100)/100;
  TH0.innerHTML = Math.round(TodayData[0].temp.value * 10)/10;
  WH0.innerHTML = Math.round(TodayData[0].wind_speed.value *10)/10;
  WGH0.innerHTML = Math.round(TodayData[0].wind_gust.value *10)/10;

  RH1.innerHTML = Math.round(TodayData[1].precipitation.value *  100)/100;
  TH1.innerHTML = Math.round(TodayData[1].temp.value * 10)/10;
  WH1.innerHTML = Math.round(TodayData[1].wind_speed.value *10)/10;
  WGH1.innerHTML = Math.round(TodayData[1].wind_gust.value *10)/10;

  RH2.innerHTML = Math.round(TodayData[2].precipitation.value *  100)/100;
  TH2.innerHTML = Math.round(TodayData[2].temp.value * 10)/10;
  WH2.innerHTML = Math.round(TodayData[2].wind_speed.value *10)/10;
  WGH2.innerHTML = Math.round(TodayData[2].wind_gust.value *10)/10;

  RH3.innerHTML = Math.round(TodayData[3].precipitation.value *  100)/100;
  TH3.innerHTML = Math.round(TodayData[3].temp.value * 10)/10;
  WH3.innerHTML = Math.round(TodayData[3].wind_speed.value *10)/10;
  WGH3.innerHTML = Math.round(TodayData[3].wind_gust.value *10)/10;

  RH4.innerHTML = Math.round(TodayData[4].precipitation.value *  100)/100;
  TH4.innerHTML = Math.round(TodayData[4].temp.value * 10)/10;
  WH4.innerHTML = Math.round(TodayData[4].wind_speed.value *10)/10;
  WGH4.innerHTML = Math.round(TodayData[4].wind_gust.value *10)/10;

  RH5.innerHTML = Math.round(TodayData[5].precipitation.value *  100)/100;
  TH5.innerHTML = Math.round(TodayData[5].temp.value * 10)/10;
  WH5.innerHTML = Math.round(TodayData[5].wind_speed.value *10)/10;
  WGH5.innerHTML = Math.round(TodayData[5].wind_gust.value *10)/10;

  RH6.innerHTML = Math.round(TodayData[6].precipitation.value *  100)/100;
  TH6.innerHTML = Math.round(TodayData[6].temp.value * 10)/10;
  WH6.innerHTML = Math.round(TodayData[6].wind_speed.value *10)/10;
  WGH6.innerHTML = Math.round(TodayData[6].wind_gust.value *10)/10;

}

//The bandwidth used by this function can be reduced by 
//specifying an end time and not calling temp and wind speed when not required
const fetchNext5DaysForcast = async () => {
  try{        
    const response = await fetch(url_Next5Start + url_CClat + searchLat.value + url_CClon + searchLong.value + url_Next5End + CCAPI_key);
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
  try{        
    const response = await fetch(url_HourlyStart + url_CClat + searchLat.value + url_CClon + searchLong.value + url_HourlyEnd + CCAPI_key);
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

searchCoordinates.addEventListener('click', searchCoordinatesButtonPressed);

/*
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
*/
