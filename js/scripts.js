//Variaveis e seleções de elementos
const apiKey = "02bc07143ee13596975bd6fea6ad1a1b"
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const errorElement = document.querySelector("#error p")
const errorContainer = document.querySelector("#error")


//Funções
const getWatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return (data)

}


const showWeatherData = async (city) => {
    try {


        const data = await getWatherData(city);


        cityElement.innerText = data.name
        tempElement.innerText = parseInt(data.main.temp)
        descElement.innerText = data.weather[0].description
        weatherIconElement.setAttribute(
            "src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        )
        countryElement.setAttribute("src", apiCountryURL + data.sys.country)
        humidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed}km/h`

        weatherContainer.classList.remove("hide")

    } catch (e) {
        errorContainer.classList.remove('hide')
        errorElement.innerText = "Houve um erro, não foi possível encontar a cidade informada.. \n" +
            " Verifique se o nome está correto e tente novamente"
    }
}


//Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        const city = e.target.value
        showWeatherData(city)
    }
})