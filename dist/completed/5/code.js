
let disp = document.querySelector(".display");
let i = 0;
setInterval(function() {
    disp.innerHTML += `
    <div class="card">
        <img src="https://thispersondoesnotexist.com/image?${i}" alt="Avatar">
        <div class="description">
            <p>Персона номер 2</p> 
        </div>
    </div>`;
    i++;
}, 2000);