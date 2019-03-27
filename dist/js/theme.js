function setTheme(themeName) {

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "theme";
    link.type = "text/css";
    link.href = `../../css/theme/${themeName}.css`;
    document.getElementsByTagName("head")[0].appendChild(link);
}

const defaultTheme = "beige";

let savedTheme = localStorage.getItem("theme");
if (savedTheme !== null) {

    setTheme(savedTheme);

} else {

    setTheme(defaultTheme);
    localStorage.setItem("theme", defaultTheme);
    savedTheme = defaultTheme;

}

document.addEventListener("DOMContentLoaded", function () {

    let selectedTheme = document.getElementById("selected-theme");
    let hiddenPanel = document.getElementById("hidden-bar");
    selectedTheme.addEventListener("click", function (e) {

        hiddenPanel.classList.toggle("invisible");
        e.stopPropagation();

    });

    selectedTheme.classList.add("theme-" + savedTheme);

    let themes = document.querySelectorAll("#hidden-bar .theme-circle");
    for (let theme of themes) {

        theme.addEventListener("click", function(e) {

            setTheme(theme.dataset.theme);
            localStorage.setItem("theme", theme.dataset.theme);
            selectedTheme.classList.replace("theme-" + savedTheme, "theme-" + theme.dataset.theme);
            savedTheme = theme.dataset.theme;
            e.stopPropagation();

        });
    }
    
    document.addEventListener("click", function() {
        
        if (!hiddenPanel.classList.contains("invisible")) {

            hiddenPanel.classList.add("invisible");

        }
        
    });

    hiddenPanel.addEventListener("click", (e) => e.stopPropagation());

});