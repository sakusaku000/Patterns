// On Ready
$(document).ready(function() {
    if (localStorage.theme === "lightTheme") {
        $("body").removeClass(); $("body").addClass("lightTheme");
    } else { 2 + 2 }
    $("#TitleScreen").show(); $("#TitleString, #SubtitleString, #TitlePlayBtn").addClass("text-focus-in"); setTimeout(function(){$("#TitleString").addClass("text-shadow-pop-bottom")}, 1000)
});

var titleScreenActive = true;
var failScreenActive = false;

// Game
function PlayGame() {
    titleScreenActive = false;
    document.getElementById("start").play();
    $("#Title").addClass("text-blur-out"); setTimeout(function() {$("#TitleScreen").hide()}, 1300);
    setTimeout(function() {$("#Game").show(); Start()}, 1400);
}

var currGame = [];
var currClick = -1;
var combo = -1;
var activeGame = true;

function Start() {
    currGame = [];
    currClick = -1;
    combo = -1;
    $("#Red, #Green, #Yellow, #Blue, #status").show(); $("#status").addClass("text-focus-in");
    $("#status").text(`Combo: 0`);
    var boxes = [document.getElementById("Blue"), document.getElementById("Yellow"), document.getElementById("Green"), document.getElementById("Red")];
    var incNum = 0;
    boxes.map(box => {
        incNum += 200
        setTimeout(function() {
            $(box).removeClass("PtrnBoxGhost");
            $(box).addClass("slide-in-blurred-left");
        }, incNum);
    })
    setTimeout(function() {
        $("#Red, #Green, #Yellow, #Blue").removeClass("slide-in-blurred-left");
        $("#status").removeClass("text-focus-in");
        Anim()
    }, 1500)
}

function Anim() {
    activeGame = true;
    currClick = -1;
    combo += 1;
    $("#status").text(`Combo: ${combo}`);
    var iteration = 0;
    var waitTime = 0;
    var pick = RandomPick();
    currGame.push(pick);
    setTimeout(function() {
        currGame.map(p => {
            waitTime += 1000;
            setTimeout(function() {
                iteration += 1
                if (iteration === currGame.length) {activeGame = false;}
                $(`#${p}`).addClass('pulsate-fwd');
                setTimeout(function() {
                    $(`#${p}`).removeClass('pulsate-fwd');
                }, 500)
                var sound = document.getElementById(`${p}Sound`);
                sound.cloneNode().play();
            }, waitTime)
        })
    }, 1000)
}

function BoxPress(pick) {
    if (activeGame === true) return;
    currClick += 1;
    $(`#${pick}`).addClass('pulsate-fwd');
    setTimeout(function() {
        $(`#${pick}`).removeClass('pulsate-fwd');
    }, 500);
    if (currClick === currGame.length-1) {
        if (pick === currGame[currGame.length-1]) {
            var sound = document.getElementById(`${pick}Sound`);
            sound.cloneNode().play();
            Anim()
        } else {
            Fail();
        }
    } else {
        if (pick === currGame[currClick]) {
            var sound = document.getElementById(`${pick}Sound`);
            sound.cloneNode().play();
        } else {
            Fail();
        }
    }
}

function Fail() {
    failScreenActive = true;
    $("#Red, #Green, #Yellow, #Blue, #status").addClass("roll-out-blurred-bottom");
    $("#FailCombo").text(`Your combo was ${combo}`);
    document.getElementById("fail").play();
    setTimeout(function() {
        $("#Red, #Green, #Yellow, #Blue, #status").hide(); $("#Red, #Green, #Yellow, #Blue, #status").removeClass('roll-out-blurred-bottom');
        $("#FailBox").show(); $("#FailBox").addClass("text-focus-in");
        setTimeout(function() {
            $("#FailTitle").addClass("text-shadow-pop-bottom")
        }, 1000)
    }, 800)
}

function Reload() {
    failScreenActive = false;
    $("#ThemeToggle").removeClass("text-focus-in"); $("#FailBox").addClass("text-blur-out"); $("#Red, #Green, #Yellow, #Blue").addClass("PtrnBoxGhost")
    setTimeout(function() {
        $("#FailBox").hide(); $("#FailBox").removeClass(); $("#FailTitle").removeClass("text-shadow-pop-bottom");
        document.getElementById("start").play();
        Start();
    }, 1500)
}
        
function RandomPick() {
    var picks = ['Red', 'Green', 'Yellow', 'Blue'];
    var pick = picks[Math.floor(Math.random()*picks.length)];
    return pick;
}

// Options
// Toggle Theme
function ThemeToggle() {
    if ($("body").hasClass("lightTheme")) {
        $("body").removeClass(); $("body").addClass("darkTheme");
        window.localStorage.setItem("theme", "darkTheme");
    } else {
        $("body").removeClass(); $("body").addClass("lightTheme");
        window.localStorage.setItem("theme", "lightTheme");
    };
}