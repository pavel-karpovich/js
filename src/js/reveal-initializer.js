(function (window) {

    if (!window.Reveal) {
        throw new Error("Reveal.js not found!");
    }

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        slideNumber: true,
        transition: "slide", // none/fade/slide/convex/concave/zoom
    });
    Reveal.addEventListener("ready", function (event) {
        presentable.toc({
            framework: "revealjs"
        });
    });

    window.addEventListener("load", function () {

        if (typeof (Worker) === undefined) {

            return false;

        }
        let codeBlocks = document.getElementsByTagName("code");
        if (codeBlocks) {

            let worker = new Worker("../../js/worker.js");
            worker.onmessage = function (event) {

                let data = JSON.parse(event.data);
                codeBlocks[data.index].innerHTML = data.result;
                codeBlocks[data.index].classList.add("hljs");

            }
            for (let i = 0; i < codeBlocks.length; ++i) {

                worker.postMessage(JSON.stringify({
                    index: i,
                    code: codeBlocks[i].textContent
                }));

            }
            worker.postMessage(JSON.stringify({
                index: -1
            }));

        }

    });
})(window);


const separators = document.querySelectorAll('.separator');
for (const sep of separators) {
    const parent = sep.parentElement;
    const left = parent.firstElementChild;
    const right = parent.lastElementChild;
    let maxWidth = 50;
    sep.addEventListener('mousedown', function(e) {
        function move(e) {
            maxWidth += e.movementX * 100 / parent.parentElement.offsetWidth;
            left.style.maxWidth = maxWidth + '%';
            right.style.maxWidth = (100 - maxWidth) + '%';
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function up() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        });
    });
}