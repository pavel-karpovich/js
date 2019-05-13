
function proxyFetch(url, params) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  return fetch(proxyUrl + url, params);
}

async function initGreeting() {
  const response = await proxyFetch('http://names.drycodes.com/1?combine=2&separator=space')
  console.log(response);
  const names = await response.json();
  console.log(names);
  document.body.innerHTML = 
    `<div class="welcome">
      <p>Добро пожаловать, странник!</p>
      <p>Я буду звать тебя <span class="name">${names[0]}</span>, ок?</p>
    </div>
    <div>
      <button class="ok-button">Ладно</button>
    </div>`;
}

initGreeting();