const allPre = document.querySelectorAll('.reveal pre');
for (const pre of allPre) {
  pre.dataset.preventSwipe = true;
}