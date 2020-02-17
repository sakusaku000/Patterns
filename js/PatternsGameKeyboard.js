$(document).on("keypress", function(p) {
    if (titleScreenActive === true) {
        if (p.which === 13) {
            PlayGame();
        }
    } else if (failScreenActive === true) {
        if (p.which === 13) {
            Reload();
        }
    }

    if (p.which === 84) {
        ThemeToggle();
    }

    if (activePulses === true) return;
    if (p.which === 49) {
        $("#Red").click();
    } else if (p.which === 50) {
        $("#Green").click()
    } else if (p.which === 51) {
        $("#Yellow").click()
    } else if (p.which === 52) {
        $("#Blue").click()
    }
})