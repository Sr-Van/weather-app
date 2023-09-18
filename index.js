const tempToday = document.querySelector('.temperature-today')

const weekWeatherCards = document.querySelector('.week-weather')

const imageTemperature = document.querySelector('[data-img="img"]')



const showData = ({daily}) => {
    const todayTempMax = daily.temperature_2m_max[0]
    const todayTempMin = daily.temperature_2m_min[0]

    const todayMediumTemp = Math.trunc((todayTempMax + todayTempMin) / 2)

    const todayShower = daily.showers_sum[4]
    
    console.log(daily);
    tempToday.innerHTML = todayMediumTemp

    cardDaySelected(todayShower)
}

const getWeather = async (position) => {

    lat = position.coords.latitude;
    long = position.coords.longitude; 
    
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,rain_sum,showers_sum,snowfall_sum&timezone=America%2FSao_Paulo`)
        .then(response => response.json().then(data => showData(data)))
}

const date = new Date()
const diaDaSemana = date.getDay() + 1
const semanaD = date.get

const semana = {
    1: "Domingo",
    2: "Segunda",
    3: "Terca",
    4: "Quarta",
    5: "Quinta",
    6: "Sexta",
    7: "Sabado",
}

const cardDaySelected = todayShower => {
    const divToSelect = weekWeatherCards.children[diaDaSemana - 1]
    colorBackgroundDiv = ""
    colorTextDiv = ""

    if(todayShower == 0) {
        colorBackgroundDiv = "#ffe963"
        imageTemperature.innerHTML = `<img src="/images/sun clouds.png">`
    }
    if(todayShower > 1 && todayShower < 3) {
        colorBackgroundDiv = "#8ad0ce"
        imageTemperature.innerHTML = `<img src="/images/rain clouds.png">`
    }
    if(todayShower >= 3){
        colorBackgroundDiv = "#17155E"
        divToSelect.classList.add('color-t-white')
        imageTemperature.innerHTML = `<img src="/images/hard rain clouds.png">`
    }

    divToSelect.style.backgroundColor = colorBackgroundDiv
    divToSelect.classList.add('highlight')

}

//https://www.pinterest.com/pin/314900198926790245/




navigator.geolocation.getCurrentPosition((position) => getWeather(position))