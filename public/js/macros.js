window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
document.getElementById("nick").maxLength = "9e9";

// List instructions
var i = document.getElementById("instructions");
i.innerHTML += "<center class='text-muted'>Hold <b>W</b> for macro feed</center>";
i.innerHTML += "<center class='text-muted'>Press <b>Z</b> or <b>4</b> to split 4x</center>";
i.innerHTML += "<center class='text-muted'>Press <b>G</b> or <b>2</b> to split 2x</center>";
i.innerHTML += "<center class='text-muted'>Press <b>H</b> for horizontal linesplit</center>";
i.innerHTML += "<center class='text-muted'>Press <b>V</b> for vertical linesplit</center>";
i.innerHTML += "<center class='text-muted'>Press <b>C</b> for popsplit macro</center>";
i.innerHTML += "<center class='text-muted'>Press <b>F</b> for solo-tricksplit</center>";

// Load macros
var canFeed = false;
function keydown(event) {
    if (event.keyCode == 87) {
        // Feeding Macro (w)
        canFeed = true;
        feed();
    }
    if (event.keyCode == 70) {
        // Solo-tricksplit (f)
        for (var a = 0; a < 4; a++) {
            setTimeout(function() {
                split();
                $("body").trigger($.Event("keydown", { keyCode: 87}));
                $("body").trigger($.Event("keyup", { keyCode: 87}));
            }, a * 50);
        }
    }
    if (event.keyCode == 67) {
        // Popsplit macro (C)
        split();
        setTimeout(split, Math.random() * (350 - 200) + 200);
    }
    if (event.keyCode == 90 || event.keyCode == 52) {
        // Tricksplit Macro (Z or 4)
        for (var b = 0; b < 8; b++) setTimeout(split, b * 50);
    }
    if (event.keyCode == 71 || event.keyCode == 50) {
        // Doublesplit Macro (G or 2)
        split();
        setTimeout(split, 35);
    }
    if (event.keyCode == 72) {
        // Horizontal linesplit (h)
        X = window.innerWidth / 2;
        Y = window.innerHeight / 2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
    if (event.keyCode == 86) {
        // Vertical linesplit (v)
        X = window.innerWidth / 2;
        Y = window.innerHeight / 2.2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
}

// Alias for space
function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
}