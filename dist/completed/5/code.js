
import {DisLike} from './DisLike.js';

async function proxyFetch(url, options) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(proxyUrl + url, options);
    return await response.json();
}

async function receiveUserData() {
    return await proxyFetch('https://randus.org/api.php');
}

async function getRandomName() {
    const userData = await receiveUserData();
    const name = `${userData.lname} ${userData.fname} ${userData.patronymic}`;
    return name;
}

let counter = 0;
async function changePerson() {
    const personImage = document.querySelector('.card > img');
    const personNameText = document.querySelector('.description > p');
    if (!(personImage && personNameText)) {
        return;
    }
    const getRandomNamePromise = getRandomName();
    personImage.src = 'https://thispersondoesnotexist.com/image?' + counter;
    counter++;
    personImage.addEventListener('load', async function() {
        const randomName = await getRandomNamePromise;
        personNameText.textContent = randomName;
    });
}

let canChange = true;
const timeout = 2000;
function timeoutBetweenChanges() {
    canChange = false;
    setTimeout(function() {
        canChange = true;
    }, timeout);
}
changePerson();
timeoutBetweenChanges();
const app = new DisLike();
const rightDiv = document.querySelector('.right');
const leftDiv = document.querySelector('.left');
if (rightDiv) {
    rightDiv.addEventListener('click', function() {
        if (canChange) {
            const likes = app.like();
            const visualLikeCounter = document.querySelector('.like > div');
            visualLikeCounter.textContent = likes;
            changePerson();
            timeoutBetweenChanges();
        }
    });
}

if (leftDiv) {
    leftDiv.addEventListener('click', function() {
        if (canChange) {
            const dislikes = app.dislike();
            const visualDislikeCounter = document.querySelector('.dislike > div');
            visualDislikeCounter.textContent = dislikes;
            changePerson();
            timeoutBetweenChanges();
        }
    });
}
