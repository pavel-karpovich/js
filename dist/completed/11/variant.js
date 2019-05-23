
const cubeOuter = document.querySelector('.cube-outer');
const cubeNumber = document.querySelector('.cube-inner > span');
cubeOuter.addEventListener('click', function handler() {
  cubeNumber.style.opacity = 1;
  cubeOuter.removeEventListener('click', handler);
  setTimeout(() => {
    const text = document.querySelector('.text');
    text.textContent = 'Ваш вариант:';
  }, 2000);
});