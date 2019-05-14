
function proxyFetch(url, params) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  return fetch(proxyUrl + url, params);
}

async function getRandomName() {
  const response = await proxyFetch('http://names.drycodes.com/1?combine=2&separator=space');
  const [name] = await response.json();
  return name;
}

async function getRandomAnimalImage(kind) {
  const response = await proxyFetch(`https://some-random-api.ml/img/${kind}`);
  const {link} = await response.json();
  return link;
}

async function getRandomAnimalFact(kind) {
  const response = await proxyFetch(`https://some-random-api.ml/facts/${kind}`);
  const {fact} = await response.json();
  return fact;
}

async function showAnimal(kind) {
  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  }
  const container = document.createElement('div');
  container.classList.add('animal');
  const reloadButton = document.createElement('button');
  reloadButton.classList.add('reload');
  const image = document.createElement('img');
  image.src = await getRandomAnimalImage(kind);
  const paragraph = document.createElement('p');
  paragraph.textContent = await getRandomAnimalFact(kind);
  reloadButton.addEventListener('click', async function() {
    const link = await getRandomAnimalImage(kind);
    const text = await getRandomAnimalFact(kind);
    image.src = link;
    image.onload = () => paragraph.textContent = text;
  });
  container.appendChild(reloadButton);
  container.appendChild(image);
  container.appendChild(paragraph);
  document.body.appendChild(container);
}

async function selectAnimal() {
  document.body.innerHTML = 
    `<div class="select">
      <p>А на чьей стороне ты?</p>
      <ul>
        <li>Коты</li>
        <li>Собаки</li>
        <li>Лисы (???)</li>
      </ul>
    </div>`;
    const items = document.querySelectorAll('.select ul > li');
    const animals = ['cat', 'dog', 'fox'];
    for (let i = 0; i < items.length; ++i) {
      items[i].addEventListener('click', async function() {
        await showAnimal(animals[i]);
      });
    }
}


async function initGreeting() {
  const name = await getRandomName();
  const text = document.createElement('div');
  text.classList.add('welcome');
  text.innerHTML = 
    `<p>Добро пожаловать, странник!</p>
     <p>Я буду звать тебя <span class="name">${name}</span>, ок?</p>`;
  const buttons = document.createElement('div');
  const okButton = document.createElement('button');
  okButton.classList.add('button');
  okButton.textContent = 'Ладно...';
  const noButton = document.createElement('button');
  noButton.classList.add('button');
  noButton.textContent = 'А может не надо?..';
  buttons.appendChild(okButton);
  buttons.appendChild(noButton);
  document.body.appendChild(text);
  document.body.appendChild(buttons);
  okButton.addEventListener('click', selectAnimal);
  noButton.addEventListener('click', async function() {
    const newName = await getRandomName();
    text.innerHTML = `<p>Хм... Тогда что насчёт</p><p><span class="name">${newName}</span>?</p>`;
  });
}

initGreeting();