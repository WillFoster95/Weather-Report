import apikey from './apikey.js';

const searchButton = document.querySelector('#searchButton');
const searchInputField = document.querySelector('#searchInputField');
const testParagraph = document.querySelector('#testParagraph');
const url_sitelist = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=';
const url_forcasts = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/';

const api_key = apikey;

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

const findLocationIndex = (locationArray) => {
  for(let i = 0; i<locationArray.length; i++){
    if(locationArray[i].name == searchInputField.value){      
      return i;
    }
  }
  return "place not found";
}

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
