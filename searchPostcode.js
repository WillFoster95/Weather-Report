

//for climacell API using long and lat
const searchCoordinatesButtonPressed = async () => {
  var startTime = new Date();
  const Next5Data = fetchNext5DaysForcast();          
  //const TodayData = fetchTodaysForcast();             
  //let Last5Data = await fetchLast5DaysForcast();  
  
  //Today
  displayTodayForcast(await Next5Data);
  
  //Next 5 days
  displayNext5Forcast(await Next5Data);

  //Hourly
  //displayHourlyForcast(await TodayData);

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


const fetchNext5DaysForcast = async () => {
  try{        
    const response = await fetch("https://nrv9wuyj48.execute-api.us-east-1.amazonaws.com/default/Weather_Report_Backend?lat=" + searchLat.value + "&lon=" + searchLong.value);
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
    const response = await fetch("https://nrv9wuyj48.execute-api.us-east-1.amazonaws.com/default/Weather_Report_Backend");
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



//Testing react element
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

const domContainer = document.querySelector('#test_React_container');
ReactDOM.render(e(LikeButton), domContainer);
//end of testing react element







searchCoordinates.addEventListener('click', searchCoordinatesButtonPressed);

