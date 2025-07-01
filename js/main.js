let todayy = document.getElementById('today')
let dateT = document.getElementById('date-t')
let cityT = document.querySelector('#location-t')
let degreeT = document.getElementById('degree-t')
let imgT = document.getElementById('img-t')
let descT = document.getElementById('desc-t')
let humT = document.getElementById('info-h-t')
let windT = document.getElementById('info-w-t')
let compassT = document.getElementById('info-c-t')
let tomorrow = document.getElementById('tomorrow')
let dateTo = document.getElementById('date-to')
let degreeTo = document.getElementById('degree-to')
let degreeToMin = document.getElementById('degree-to-min')
let imgTo = document.getElementById('img-to')
let descTo = document.getElementById('desc-to')
let tomorrow2 = document.getElementById('today-oo')
let dateToo = document.getElementById('date-too')
let search = document.getElementById('input-search')
let degreeToo = document.getElementById('degree-too')
let degreeTooMin = document.getElementById('degree-too-min')
let imgToo = document.getElementById('img-too')
let descToo = document.getElementById('desc-too')
let inputSub = document.getElementById('input-sub')
let city = 'cairo'

function getDayName(dayName) {
  const date = new Date(dayName);
  const options = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
}


if (localStorage.getItem('name')) {
  city = localStorage.getItem('name')
}
getWeather()

document.getElementById('submit').addEventListener('click', function () {
  city = search.value
  search.value = ''
  getWeather()
})

search.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    city = search.value
    search.value = ''
    getWeather()
  }
})

async function getWeather() {
  try {
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a57bc4b37891402eb98112911253006&q=${city}&days=3`)
    if (!response.ok) {
      throw new Error("City not found");
    }

    let weather = await response.json()
    localStorage.setItem('name', city)
    
    //===============================================================================================
    todayy.innerHTML = getDayName(weather.forecast.forecastday[0].date);
    dateT.innerHTML = weather.forecast.forecastday[0].date;
    cityT.innerHTML = weather.location.name;
    imgT.setAttribute('src', weather.current.condition.icon);
    degreeT.innerHTML = weather.forecast.forecastday[0].day.maxtemp_c + `<sup>o</sup>C`;
    descT.innerHTML = weather.current.condition.text;
    humT.innerHTML = weather.current.humidity + "%";
    windT.innerHTML = weather.current.wind_kph + " km/h";
    compassT.innerHTML = weather.current.wind_dir;
//===============================================================================================
tomorrow.innerHTML = getDayName(weather.forecast.forecastday[1].date);
dateTo.innerHTML = weather.forecast.forecastday[1].date;
imgTo.setAttribute('src', weather.forecast.forecastday[1].day.condition.icon);
degreeTo.innerHTML = weather.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
degreeToMin.innerHTML = weather.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`;
descTo.innerHTML = weather.forecast.forecastday[1].day.condition.text;

//===============================================================================================
tomorrow2.innerHTML = getDayName(weather.forecast.forecastday[2].date);
dateToo.innerHTML = weather.forecast.forecastday[2].date;
imgToo.setAttribute('src', weather.forecast.forecastday[2].day.condition.icon);
degreeToo.innerHTML = weather.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
degreeTooMin.innerHTML = weather.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`;
descToo.innerHTML = weather.forecast.forecastday[2].day.condition.text;
 //===============================================================================================

} catch (error) {
  Swal.fire({
      icon: 'error',
      title: "error",
      text: 'This city is not Found',
      confirmButtonText: 'Ok'
    });
  }
}

document.getElementById('submit-sub').addEventListener('click', function () {
  let regexSub = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  let regEmail = regexSub.test(inputSub.value)
  if (regEmail) {
    Swal.fire({
      icon: 'success',
      title: 'تم الاشتراك',
      text: 'شكراً لاشتراكك في النشرة البريدية 😊',
      confirmButtonText: 'Ok'
    });
    inputSub.value = '';
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please Enter a Valid Email',
      confirmButtonText: 'Try again'
    });
  }
})

inputSub.addEventListener('keyup', function (e) {
  let regexSub = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  let regEmail = regexSub.test(inputSub.value)
  if (e.key == 'Enter') {
    if (regEmail) {
      Swal.fire({
        icon: 'success',
        title: 'تم الاشتراك',
        text: 'شكراً لاشتراكك في النشرة البريدية 😊',
        confirmButtonText: 'Ok'
      });
      inputSub.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please Enter a Valid Email',
        confirmButtonText: 'Try again'
      });
    }
  }
})
