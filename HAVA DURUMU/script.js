const select = document.querySelector('#sehir')
const wrapper = document.querySelector('.wrapper')

let iller =["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"]

iller.forEach(il =>{
    const option = document.createElement('option')
    option.textContent = il
    select.append(option)
})




async function getWeather(xcity){
    let key = '00e5b57d10c163d7617146bfd5544134'
    let city = xcity

    let api = ''


    if(typeof(city) == 'string'){
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`
    }else{
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${key}&units=metric&lang=tr`
    }

    let res = await fetch(api)
    if(res.ok){
        let data = await res.json()
        ekranaYazdir(data)
    }else{
        console.log(res)
    }   
}

select.addEventListener('change',function sehirSec(){
    getWeather(select.value)
})


function ekranaYazdir(veri){
    wrapper.innerHTML = ''
    let sehirAdi = veri.name
    let hissedilen = veri.main.feels_like
    let sicaklik = veri.main.temp
    let nem = veri.main.humidity

    let havaDurumu = veri.weather[0].description
    let icon = veri.weather[0].icon

    // if(havaDurumu.includes('yağmur')){
    //     document.body.style.backgroundImage = 'url(./img/yamur.gif)'
    // }
    const card = document.createElement('div')
    card.classList.add('card', 'm-auto', 'p-0')
    card.innerHTML = 
    `
        <div class="card-header d-flex align-items-center justify-content-between">
            <h4 class="card-title">${sehirAdi}</h4>
            <img src="./img/${icon}.png" width="60" alt="">
        </div>
        <div class="card-body">
            <p class="card-text">Hissedilen sıcaklık : ${hissedilen}</p>
            <p class="card-text">Sıcaklık : ${sicaklik}</p>
            <p class="card-text">Hava Durumu : ${havaDurumu}</p>
            <p class="card-text">Nem miktarı : ${nem}</p>
        </div>
    
    `
    wrapper.append(card)
}



navigator.geolocation.getCurrentPosition(showposition,showerror)

function showerror(error){
    console.log(error)
}
function showposition(position){
    // console.log(position.coords)

    getWeather(position.coords)
}