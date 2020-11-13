import apikey from './apikey.js';

const searchButton = document.querySelector('#searchButton');
const searchInputField = document.querySelector('#searchInputField');

const ulr = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist';
const api_key = apikey;

searchButton.addEventListener('click', seachLocations);

const searchLocations = async (searchInputField) => {
    try{
        const response = await fetch('');
        if (response.ok){
          const jsonResponse = await response.json();
          //console.log(jsonResponse);
          //firstParagraph.innerHTML = JSON.stringify(jsonResponse.Locations.Location);
          //formatOutput(jsonResponse);
          return;
        }
        throw new Error('Request failed!')
      }
      catch(error){
        console.log(error);    
      }

}

