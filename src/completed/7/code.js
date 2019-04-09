function cssEditor() {

    let panel = document.createElement("div");
    panel.innerHTML = `<div id="pan1" style="background: rgb(200,200,200); width: 25%; height: auto; border: 1px solid black;
                        display: flex; flex-flow: column nowrap; position: fixed; bottom: 20px; right: 20px;"></div>`;
    document.body.appendChild(panel);
    panel = panel.firstElementChild;

    function appendItem(stylesheet) {

        let newItem = document.createElement("div");
        newItem.style.background = "white";
        newItem.style.margin = "3px 6px";
        newItem.style.width = "calc(100% - 12px)";
        newItem.style.height = "20px";
        newItem.style.cursor = "pointer";
        newItem.style.display = "flex";
        newItem.style.flexFlow = "row nowrap";
        let indicator = document.createElement("span");
        indicator.style.width = "20px";
        indicator.style.height = "20px";
        indicator.style.marginRight = "30px";
        indicator.style.borderRadius = "50%";
        indicator.style.border = "1px solid black";
        newItem.appendChild(indicator);
        let text = document.createElement("span");
        text.style.height = "20px";
        text.style.lineHeight = "20px";
        text.innerHTML = stylesheet.href != null ? stylesheet.href : "inline";
        newItem.appendChild(text);
        panel.appendChild(newItem);

        let updateColorStatus = function() {
            
            if (stylesheet.disabled) {
                indicator.style.background = "red";
            } else {
                indicator.style.background = "green";
            }
        }
        updateColorStatus();
        newItem.addEventListener("click", function() {

            stylesheet.disabled = !stylesheet.disabled;
            updateColorStatus();

        });
    }
    for (let i = 0; i < document.styleSheets.length; ++i) {
        appendItem(document.styleSheets[i]);
    }

}
cssEditor();