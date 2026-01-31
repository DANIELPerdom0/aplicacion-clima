const API_KEY = "fe5d44216da2591d243558590d49d973"
const form = document.getElementById("weather-form")
const input = document.getElementById("city-input")
const message = document.getElementById("message")

const tempEl = document.getElementById("temperature")
const descEl = document.getElementById("description")
const cityEl = document.getElementById("city")
const iconEl = document.getElementById("weather-icon")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const city = input.value.trim()

  if (city === "") {
    message.textContent = "⚠️ Escribe una ciudad"
    return
  }

  message.textContent = "Buscando clima..."

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    )

    if (!response.ok) {
      throw new Error("Ciudad no encontrada")
    }

    const data = await response.json()

    tempEl.textContent = `${Math.round(data.main.temp)}°C`
    descEl.textContent = data.weather[0].description
    cityEl.textContent = data.name

    const iconCode = data.weather[0].icon
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    document.getElementById("weather").style.display = "block"


    message.textContent = ""
    input.value = ""

  } catch (error) {
    document.getElementById("weather").style.display = "none"
    message.textContent = "❌ No se encontró la ciudad"

  }
})
