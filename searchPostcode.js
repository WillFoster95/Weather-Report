import apikey from './apikey.js';

const searchButton = document.querySelector('#searchButton');
const searchInputField = document.querySelector('#searchInputField');
const testParagraph = document.querySelector('#testParagraph');
const url = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=';

const api_key = apikey;

const getRawLocationData = async () => {
    try{
        const response = await fetch(url);
        if (response.ok){
          const jsonResponse = await response.json(url + '?key=' + api_key);
          console.log(jsonResponse);

          testParagraph.innerHTML = JSON.stringify(jsonResponse);
       
          return;
        }
        throw new Error('Request failed!')
      }
      catch(error){
        console.log(error);    
      }

}

searchButton.addEventListener('click', getRawLocationData);