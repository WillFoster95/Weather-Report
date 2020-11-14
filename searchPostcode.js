import apikey from './apikey.js';

const searchButton = document.querySelector('#searchButton');
const searchInputField = document.querySelector('#searchInputField');
const testParagraph = document.querySelector('#testParagraph');
const url = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=';

const api_key = apikey;

const getRawLocationData = async () => {
    try{
        const response = await fetch(url + api_key);
        if (response.ok){
          const jsonResponse = await response.json();
          const locationsArray = jsonResponse.Locations.Location
          //console.log(jsonResponse);
          let locationIndex = findLocationIndex(locationsArray);   
          console.log(locationIndex);

          testParagraph.innerHTML = JSON.stringify(locationsArray[locationIndex]);

          //testParagraph.innerHTML = JSON.stringify(jsonResponse.Locations.Location);       
          return;
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

searchButton.addEventListener('click', getRawLocationData);