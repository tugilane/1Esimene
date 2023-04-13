import axios from "axios";

// getting coordinates and .get current, daily, hourly data  

export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timeformat=unixtime",
        { 
            params : {
                 latitude: lat,
                 longitude: lon,
                 timezone,
           },
        }
    ).then(({ data}) => {
          return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data),
        } 
    }) 
}

//function to gather current and daily weather data
function parseCurrentWeather({current_weather, daily }) {
    const {
         temperature: currentTemp,
         windspeed: windSpeed,
         weathercode: iconCode
        } = current_weather
        
        // alternative for: const maxTemp = daily.temperature_2m_max[0]
        const {
            temperature_2m_max: [maxTemp],
            temperature_2m_min: [minTemp],
            sunrise: [sunRise],
            sunset: [sunSet],
            precipitation_probability_max: [precipMax]
        } = daily

        // epoch to "HH:MM" conversion
        const clockTimeRise = new Date(sunRise)
        const hoursRise = clockTimeRise.getHours();
        const minutesRise = clockTimeRise.getMinutes().toString().padStart(2, '0');
        const clockStringRise = `${hoursRise}:${minutesRise}`;

        const clockTimeSet = new Date(sunSet)
        const hoursSet = clockTimeSet.getHours();
        const minutesSet = clockTimeSet.getMinutes().toString().padStart(2, '0');
        const clockStringSet = `${hoursSet}:${minutesSet}`;

    return {
     currentTemp: Math.round(currentTemp),
     highTemp: Math.round(maxTemp),
     lowTemp: Math.round(minTemp),
     sunrise: clockStringRise,
     sunset: clockStringSet,
     windSpeed: Math.round(windSpeed),
     precip: precipMax,
     iconCode,
    } 
}

function parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
return {
    timestamp: time * 1000,
    iconCode: daily.weathercode[index],
    maxTemp: Math.round(daily.temperature_2m_max[index])
}
    })
}
function parseHourlyWeather({ hourly, current_weather}) {
    return hourly.time.map((time, index) => {
    return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]), 
        precip: Math.round(hourly.precipitation_probability[index]),
        humidity: Math.round(hourly.relativehumidity_2m[index]),
        
    }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000)
}