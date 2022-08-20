
const APPKEY = 'b3793fa27f3523785e39456380d43fbf'
const APPKEY_positionstack = '1ca1073357cef86919c12fba6bb02333'
const url_positionstack = 'http://api.positionstack.com/v1/'
const url_openweather = 'https://api.openweathermap.org/data/2.5/'

const getWeather = async (country = 'Buenos Aires', units = 'metric') => {
    localStorage.setItem('country', country)
    localStorage.setItem('units', units)
    try {
        const responsePosition = await fetch(`${url_positionstack}forward?query=${country}&limit=1&access_key=${APPKEY_positionstack}`)
        const ubicacion = await responsePosition.json()

        const response = await fetch(`${url_openweather}onecall?lat=${ubicacion.data[0].latitude}&lon=${ubicacion.data[0].longitude}&units=${units}&exclude=minutely&APPID=${APPKEY}`)
        const weather = await response.json()

        document.querySelector('#city').innerHTML = country
        document.querySelector('#temp').innerHTML = `${Math.round(weather.current.temp)}°`
        document.querySelector('#feels-like').innerHTML = `${Math.round(weather.current.feels_like)}°`
        document.querySelector('#humidity').innerHTML = `${weather.current.humidity}%`
        document.querySelector('#wind-speed').innerHTML = `${weather.current.wind_speed}km/h`
        document.querySelector('#img-weather').src = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
        document.querySelector('#img-weather').alt = `${weather.current.weather[0].description}`
        document.querySelector('#desciption-weather').innerHTML = `${weather.current.weather[0].main}`
        
        const rootElem = document.querySelector(':root')
        if(weather.current.weather[0].icon.includes('d')) {
            rootElem.style.setProperty('--background', '#fff')
            rootElem.style.setProperty('--primary', '#d4dbfb')
            rootElem.style.setProperty('--font', '#131121')
        } else {
            rootElem.style.setProperty('--background', '#131121')
            rootElem.style.setProperty('--primary', '#1C1A2E')
            rootElem.style.setProperty('--font', '#FFFFFF')
        }
    }
    catch (error) {
        console.log(error)
    }
}

getWeather()

const units = document.querySelector('#units')
const inputCountries = document.querySelector('#search')

units.addEventListener('change', () => {
    localStorage.setItem('units', units.value)
    getWeather(localStorage.getItem('county'), units.value)
})

inputCountries.addEventListener('change', () => {
    localStorage.setItem('county', inputCountries.value)
    getWeather(inputCountries.value, localStorage.getItem('units'))
})

