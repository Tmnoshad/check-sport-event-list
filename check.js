const input = document.getElementById('input-player');
const spinner = document.getElementById('spinner');
const button = document.getElementById('player-btn');
const error = document.getElementById('error');
const display = document.getElementById('display-section')
const eventDisplay = document.getElementById('event-display');

input.addEventListener('keyup', event => {
    error.style.display = 'none';
    eventDisplay.textContent = '';
    if (event.keyCode == 13) {
        button.click()
    }
    button.onclick = function () {
        if (input.value == '') {
            error.innerText = 'Please type something!';
            error.style.display = 'block'
            display.textContent = '';
        } else {
            display.textContent = '';
            spinner.style.display = 'block';
            fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${input.value}`)
                .then(res => res.json())
                .then(data => displayPlayer(data.player))
                .catch(err => {
                    error.innerText = 'no data found1';
                    error.style.display = 'block';
                })
            input.value = '';
        }
    }
})
button.onclick = function () {
    if (input.value == '') {
        error.style.display = 'block';
        display.textContent = '';
        eventDisplay.textContent = '';
    }
}
// display player Data
const displayPlayer = datas => {
    spinner.style.display = 'none';
    const element = datas[0];
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
            <div class="card border-0 custom-design p-4">
                    <img src="${element.strCutout}"  class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${element.strPlayer}</h5>
                <p><i class="fas fa-map-marker-alt pe-2"></i> ${element.strBirthLocation} </p>
                <p class="card-text">${element.strDescriptionEN.slice(0,102)}</p>
            </div>
                <div class="card-icon text-center">
                    <a href="${'https://'+element.strFacebook}" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                    <a href="${'https://'+element.strInstagram}" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        `;
    display.appendChild(div);
}

//evend section function

const eventInput = document.getElementById('event-input');
const eventButton = document.getElementById('event-btn');

eventInput.addEventListener('keyup', event => {
    display.textContent = '';
    error.style.display = 'none';
    if (event.keyCode == 13) {
        eventButton.click()
    }
    eventButton.onclick = () => {
        if (eventInput.value == '') {
            error.style.display = 'block';
            eventDisplay.textContent = '';
        } else {
            eventDisplay.textContent = '';
            error.style.display = 'none';
            spinner.style.display = 'block';
            fetch(`https://www.thesportsdb.com/api/v1/json/2/searchevents.php?e=${eventInput.value}`)
                .then(res => res.json())
                .then(data => showData(data))
                .catch(() => {
                    error.innerText = 'no data found2';
                    error.style.display = 'block';
                });
            eventInput.value = '';
        }
    }
})

eventButton.onclick = () => {
    if (eventInput.value == '') {
        error.style.display = 'block';
        eventDisplay.textContent = '';
        display.textContent = '';
    }
}


const showData = element => {
    const dataValue = element.event;
    spinner.style.display = 'none';
    for (const list of dataValue) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-0 custom-design card-icons p-3">
        <div class="card-body">
          <h5 class="card-title mb-4">${list.strEvent}</h5> 
          <p class="card-text"> <i class="fas fa-running"></i>Sport: ${list.strSport}</p>
          <div class="row">
            <div class="col-lg-6 col-6"><p><i class="fas fa-globe-europe"></i>${list.strCountry}</p></div>
            <div class="col-lg-6 col-6"><p>Session: ${list.strSeason}</p></div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-6"><p> <i class="fas fa-calendar-check"></i>${list.dateEvent}</p></div>
            <div class="col-lg-6 col-6"><p>Time: ${list.strTime}</div>
          </div>
        </div>
      </div>
        `;
        eventDisplay.appendChild(div);
    }

}