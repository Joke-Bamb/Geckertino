// ==UserScript==
// @name        Bamb Sanity Module
// @description Makes sure settings are enabled.
// @loadorder   2
// @include     main
// ==/UserScript==


gesanity = {
    "toolkit.legacyUserProfileCustomizations.stylesheets": true,
    "browser.newtab.preload": false,
    "browser.theme.dark-private-windows": false
}

window.addEventListener("load", function() {
    let ii = false;
    for (const i in gesanity) {
        if (gePrefUtils.tryGet(i).bool != gesanity[i]) {
            gePrefUtils.set(i).bool(gesanity[i]);
            ii = true;
        }
    }
    if (ii == true) {
        UC_API.Runtime.restart(false);
    }
});

