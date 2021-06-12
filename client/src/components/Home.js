import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect }from 'react-router-dom';

const api = {
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  key: "bae7324e8eab307b1f13c1df7a4fd6e4",
}

function Weather() {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState({});
  const [open, setOpen] = useState(true);

  const handleClickClose = () => {
      setOpen(!open);
	  window.location.reload();
}
  
  const handlesearch = async (e) => {
	
    if (e.key === "Enter") {
	if(api.baseUrl){
		var weatherData = await axios.get(`${api.baseUrl}weather?q=${name}&units=metric&APPID=${api.key}`)
        .then((res) => {
			 return res.data;
		 });
		
	}else{
		 weatherData = await axios.get('http://localhost:5000/weather')
        .then((res) => {
			 return res.data;
		 });
	}
     
		
		setWeather(weatherData);

								axios.post("http://localhost:5000/weather/add",weatherData,{
										headers: {
										'Content-type':'application/json',
												}
										})
								.then((data) => {
								console.log(data);
								
								});
	
    }
  }

return (
	  <div>
		  {!localStorage.getItem("user")?(
		<div>
			<Redirect to="/signIn" />
		</div>
	):(
		<div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'weather warm' : 'weather') : 'weather'}>
      <main>
			<div className="search-box text-center">
				<h1>Weather ForeCasting</h1>
			<input 
				type="text"
				className="searchBy"
				placeholder="Weather Search By Place"
				onChange={e => setName(e.target.value)}
				value={name}
				onKeyPress={handlesearch}
			/>
			</div>
			{(typeof weather.main != "undefined") ? (
				<Dialog
				open={open}
				className="dialogBox"
				>
				<DialogTitle className="text-center" id="alert-dialog-title">{"WEATHER DETAILS"}</DialogTitle>
				
				<DialogContent>
				<DialogContentText id="alert-dialog-description">
						<dl className="row text-center">
							
							<dt className="col-sm-6">City</dt>
							<dd className="col-sm-6">{weather.name}, {weather.sys.country}</dd>
							<dt className="col-sm-6">Temperature</dt>
							<dd className="col-sm-6">{weather.main.temp}°C</dd>
							<dt className="col-sm-6">Weather</dt>
							<dd className="col-sm-6">{weather.weather[0].main}</dd>
						</dl>
					
				</DialogContentText>
				</DialogContent>
				
				<DialogActions>
			
					<Button onClick={handleClickClose} color="primary">
					<h6>*</h6> 
					</Button>
					
				</DialogActions>
				
			</Dialog>
			
			) : ('')}
		</main>
    </div>
	)}
	  </div>
	
	  
    
  );
}

export default Weather;
