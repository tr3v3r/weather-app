const form = document.querySelector('#form')
const input = document.querySelector('#input')
const tbody = document.querySelector('#tbody')
const store = new Map() 

function renderTbody() {
    tbody.innerHTML = ''
    store.forEach((value, key) => {
        const [city, country, temperature] = value
        const row = `<tr>
            <td>${city}</td>
            <td>${country}</td>
            <td>${temperature}</td>
            <td>${temperature}</td>
        </tr>`
        tbody.innerHTML = tbody.innerHTML + row
    })
}

function getWeather(city) {
    const promise = fetch(`http://api.weatherstack.com/current?access_key=c18c9cd0a7159022db85263eea437534&query=${city}`)
   
    return promise
    .then(result => result.json())    
}

form.onsubmit = function(event) {
    event.preventDefault()
    getWeather(input.value).then(data => {
        const { 
            location: { name, country },
            current: { temperature }
        } = data

        store.set(name, [name, country, temperature])
        renderTbody()
    })
}
