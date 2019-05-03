
const workspace = document.querySelector('.workspace');
workspace.addEventListener('mousedown', function(e) {
  if (!e.target.classList.contains('circle')) {
    return;
  }
  const movable = e.target;
  let x = parseInt(movable.style.left.slice(0, -2));
  let y = parseInt(movable.style.top.slice(0, -2));
  const offsetX = e.offsetX;
  const offsetY = e.offsetY;
  const height = movable.offsetHeight;
  const width = movable.offsetWidth;
  movable.classList.replace('grab', 'grabbing');
  document.body.style.cursor = 'grabbing';
  function move(e) {
    // console.dir(e);
    e.preventDefault();
    x += e.movementX;
    y += e.movementY;
    if (e.x < workspace.offsetLeft + offsetX) {
      x = 0;
    } else if (e.x > workspace.offsetLeft + workspace.clientWidth - width + offsetX) {
      x = workspace.clientWidth - width;
    }
    if (e.y < workspace.offsetTop + offsetY) {
      y = 0;
    } else if (e.y > workspace.offsetTop + workspace.clientHeight - height + offsetY) {
      y = workspace.clientHeight - height;
    }
    movable.style.left = x + 'px';
    movable.style.top = y + 'px';
  }
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', function up(e) {
    document.removeEventListener('mouseup', up);
    document.removeEventListener('mousemove', move);
    document.body.style.cursor = 'default';
    movable.classList.replace('grabbing', 'grab');
  });
}, true);