import { getWeather } from "./weather";
import { ICON_MAP } from "./iconMap";


getWeather(59.4370, 24.7536, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e => {
    console.error(e)
    alert("Error getting weather.")
})



function renderWeather({ current, daily, hourly}) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly) 
    document.body.classList.remove("blurred")
}

function setValue(selector, value, {parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
setValue("current-temp", current.currentTemp)
setValue("current-high", current.highTemp)
setValue("current-low", current.lowTemp)
setValue("current-sunrise", current.sunrise)
setValue("current-sunset", current.sunset)
setValue("current-wind", current.windSpeed)
setValue("current-precip", current.precip)

}

const DAY_FORMATTER = new Intl.dateTimeFormat(undefined, {weekday:
    "long"})
const dailySection = document.querySelector("data-day-section")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.HTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp;", day.maxTemp, {parent: element})
   /* date time format */     setValue("date;", DAY_FORMATTER.format(day.timestamp), {parent: element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)

    })
}


    const HOUR_FORMATTER = new Intl.dateTimeFormat(undefined, {hour:
        "numeric"})
    const hourlySection = document.querySelector("data-hour-section")
    const hourRowTemplate = document.getElementById("hour-row-template")
    function renderHourlyWeather(hourly) {
        hourlySection.HTML = ""
        hourly.forEach(day => {
            const element = dayCardTemplate.content.cloneNode(true)
            setValue("temp;", hour.temp, {parent: element})
            setValue("temp;", hour.feelsLike, {parent: element})
            setValue("temp;", hour.windSpeed, {parent: element})
            setValue("temp;", hour.precip, {parent: element})
            setValue("temp;", hour.humidity, {parent: element})
             setValue("day;", DAY_FORMATTER.format(hour.timestamp), {parent: element})
             setValue("time;", DAY_FORMATTER.format(day.timestamp), {parent: element})
            element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
            hourlySection.append(element)
    
        })
}