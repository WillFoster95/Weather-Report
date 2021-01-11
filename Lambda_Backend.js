const https = require('https');

exports.handler = async (event) => 
{
  let dataString = '';
  const apiKey = process.env.apiKey;
  const lat = event.queryStringParameters.lat;
  const lon = event.queryStringParameters.lon;
  const forcast_type = event.queryStringParameters.forcast_type;
  let response;
  
  if (forcast_type == "daily")
  {
    response = await new Promise((resolve, reject) => {
      const req = https.get("https://api.climacell.co/v3/weather/forecast/daily?lat=" + lat + "&lon=" + lon + "&unit_system=si&start_time=now&fields=precipitation_accumulation%2Ctemp%2Cwind_speed&apikey=" + apiKey, function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: 200,
            body: JSON.stringify(JSON.parse(dataString))
          });
        });
      });
        
      req.on('error', (e) => {
        reject({
          statusCode: 500,
          body: 'Something went wrong!'
        });
      });
    });      
  }

  else if (forcast_type == "hourly")
  {
    response = await new Promise((resolve, reject) => {
      const req = https.get("https://api.climacell.co/v3/weather/forecast/hourly?lat=" + lat + "&lon=" + lon + "&unit_system=si&start_time=now&fields=precipitation%2Ctemp%2Cwind_speed&apikey=" + apiKey, function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: 200,
            body: JSON.stringify(JSON.parse(dataString))
          });
        });
      });
          
      req.on('error', (e) => {
        reject({
          statusCode: 500,
          body: 'Something went wrong!'
        });
      });
    });      
  }

  return response;
  
};