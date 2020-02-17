// Patterns Web Game - Developed by Saku ♡ (H.T.S)

// -- Page Load
$(document).ready(function() {
    // Theme Check
    if (localStorage.theme === "lightTheme") {
        $("body").removeClass(); $("body").addClass("lightTheme");
    } else { 2 + 2 }

    // Title Screen Animation
    $("#TitleScreen").show(); // Display Title Screen DIV
    $("#TitleString, #SubtitleString, #TitlePlayBtn, #TitleLeaderboard").addClass("text-focus-in"); // Animate in Title Screen elements
    setTimeout(function() { $("#TitleString").addClass("text-shadow-pop-bottom"); }, 1000); // Animate Title String Shadow
});

// -- Play Game
function PlayGame() {
    titleScreenActive = false; // Title Screen goes inactive
    $("#Title, #TitleLeaderboard").addClass("text-blur-out"); // Anim out title screen
    setTimeout(function() {
        $("#TitleScreen").hide(); // Hide title screen
        $("#Game").show(); beginSession(); document.getElementById("start").cloneNode().play(); // Play start sound & Begin game code
    }, 1400);
}

// -- Game Data
// Active Screens
var titleScreenActive = true; // Title Screen
var failScreenActive = false; // Fail Screen
var failScreenSubmitActive = false;
// Current Session Data
var patternSequence = []; // Pattern Sequence
var playerClicks = -1; // Amount of clicks in each combo
var combo = -1; // Combo
var activePulses = true; // Check if pulses are active, if true deny button presses

// -- Game Functions
function RandomPick() {
    // Randomly select one colour and return it back
    var picks = ["Red", "Green", "Yellow", "Blue"];
    return picks[Math.floor(Math.random()*picks.length)];
};
function pulsateAnim(box) {
    $(`#${box}`).addClass("pulsate-fwd");
    setTimeout(function() {
        $(`#${box}`).removeClass("pulsate-fwd");
    }, 500);
};
function ThemeToggle() {
    if ($("body").hasClass("lightTheme")) {
        $("body").removeClass(); $("body").addClass("darkTheme");
        window.localStorage.setItem("theme", "darkTheme");
        // Change to dark theme
    } else {
        $("body").removeClass(); $("body").addClass("lightTheme");
        window.localStorage.setItem("theme", "lightTheme");
        // Change to light theme
    };
};

// -- Begin Session
function beginSession() {
    // Reset Data
    patternSequence = []; // Empty current sequence
    combo = -1; // Empty combo
    $("#status").text(`Combo: 0`); // Reset combo text

    // Animations
    $("#Red, #Green, #Yellow, #Blue, #status").show(); // Display elements
    $("#status").addClass("text-focus-in"); // Animate in combo status

    // Box Animations
    var boxes = ["Blue", "Yellow", "Green", "Red"]; // Define boxes in array
    var boxesAnimDelay = 0; // Delay time for each animation
    boxes.map(box => {
        boxesAnimDelay += 200; // Delay by 200 each time
        setTimeout(function() {
            $(`#${box}`).removeClass("PtrnBoxGhost"); // Make box visible
            $(`#${box}`).addClass("slide-in-blurred-left"); // Play Animation
        }, boxesAnimDelay);
    });

    // Clear animations and start pulses
    setTimeout(function() {
        $("#Red, #Green, #Yellow, #Blue").removeClass("slide-in-blurred-left"); // Remove anim from boxes
        $("#status").removeClass("text-focus-in"); // Remove anim from combo status
        // Run Pulse
        Pulse();
    }, 2000);
};

// -- Pulses
function Pulse() {
    // Set data
    activePulses = true; // Disable button presses
    $("#Red, #Green, #Yellow, #Blue").removeClass("PtrnBoxActive");
    playerClicks = -1; // Reset player clicks
    combo += 1; // Increase combo by 1
    $("#status").text(`Combo: ${combo}`); // Update combo total on screen

    // Grab a new colour
    var pick = RandomPick(); // Grab a colour
    patternSequence.push(pick); // Push colour to sequence

    // Run Pulses
    var pulseCount = 0;
    var pulseDelay = 0;
    setTimeout(function() {
        patternSequence.map(pulse => {
            pulseDelay += 1000; // Delay by 1 second
            setTimeout(function() {
                // Track Pulse Count
                pulseCount += 1; // Pulse count increase by 1
                if (pulseCount === patternSequence.length) {
                    setTimeout(function() {
                        activePulses = false; // Allow player input
                        $("#Red, #Green, #Yellow, #Blue").addClass("PtrnBoxActive");
                    }, 800)
                }
                // Animate Pulse w/ sound
                pulsateAnim(pulse) // Animate Box
                document.getElementById(`${pulse}Sound`).cloneNode().play(); // Play Sound
            }, pulseDelay);
        });
    }, 1000);
};

// -- Box Press
function BoxPress(pick) {
    // Check if active pulses. Deny button presses if true.
    if (activePulses === true) return;

    // Increase click count by 1
    playerClicks += 1;

    // Check accuracy
    if (playerClicks === patternSequence.length-1 && pick === patternSequence[patternSequence.length-1]) {
        // Completed sequence correctly
        pulsateAnim(pick)
        document.getElementById(`${pick}Sound`).cloneNode().play();
        setTimeout(function() {
            document.getElementById("success").cloneNode().play();
            Pulse();
        }, 700)
    } else if (pick === patternSequence[playerClicks]) {
        // Sequence going correctly
        pulsateAnim(pick)
        document.getElementById(`${pick}Sound`).cloneNode().play();
    } else {
        // Sequence failed
        Fail();
    }
};

// -- Failure
function Fail() {
    // Active fail screen
    failScreenActive = true;

    // Animate
    $("#Red, #Green, #Yellow, #Blue, #status").addClass("roll-out-blurred-bottom"); // Animate out boxes and combo status

    // Print combo total
    $("#FailCombo").text(`Your combo was ${combo}`);

    // Play Fail Sound
    document.getElementById("fail").cloneNode().play();

    setTimeout(function() {
        $("#Red, #Green, #Yellow, #Blue, #status").hide(); $("#Red, #Green, #Yellow, #Blue, #status").removeClass("roll-out-blurred-bottom"); // Hide and remove anims
        $("#FailBox").show(); $("#FailBox").addClass("text-focus-in"); // show and animate in fail screen
        setTimeout(function() {
            $("#FailTitle").addClass("text-shadow-pop-bottom"); // Fail Title animate shadow
        }, 1000);
    }, 800);
};

// -- Reload Game
function Reload() {
    // Inactive fail screen
    failScreenActive = false;

    // Reset Boxes to Ghost
    $("#Red, #Green, #Yellow, #Blue").addClass("PtrnBoxGhost");

    // Reset boxes to inactive
    $("#Red, #Green, #Yellow, #Blue").removeClass("PtrnBoxActive");

    // Animate
    $("#FailBox").addClass("text-blur-out");
    setTimeout(function() {
        $("#FailBox").hide(); $("#FailBox").removeClass(); $("#FailTitle").removeClass("text-shadow-pop-bottom"); // Reset fail screen animations
        document.getElementById("start").cloneNode().play(); // Play start sound
        beginSession();
    }, 1500);
};