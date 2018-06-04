const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=b1a290e7d1f6c773ce6e0e13ce614836&lat=45.251595&lon=19.8021971'

export const fetchWeather = (lat, lon) => {
    const url = rootUrl + '&lat=' + lat + '&lon=' + lon

    return fetch(url)
        .then(res => res.json())
        .then(json => ({
            temp: json.main.temp - 273.15,
            weather: json.weather[0].main
        }))

}