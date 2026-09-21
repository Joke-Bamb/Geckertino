// ==UserScript==
// @name        Geckertino - Eras
// @description Changes the layout of the toolbar depending on the selected design.
// @loadorder   3
// @include     main
// ==/UserScript==

lastEra = null; // used to note which era was applied last jic the same era is possibly re-applied

const geEras = {
  "1": {
    "name": "1", // Will be needed when 4 Beta gets added in.
    "safariver": "1.0", // Whatever the version string will be in About
    "minver": "1" // This is used to stop css from eras older than <minver> from being imported
  },

"2": {
    "name": "2",
    "safariver": "2.0",
    "minver": "1"
  },

"3": {
    "name": "3",
    "safariver": "3.0",
    "minver": "1"
  },

"4": {
    "name": "4",
    "safariver": "4.0",
    "minver": "1"
  },

"5": {
    "name": "5",
    "safariver": "5.0",
    "minver": "1"
  },

"6": {
    "name": "6",
    "safariver": "6.0",
    "minver": "1"
  },

"7": {
    "name": "7",
    "safariver": "7.0",
    "minver": "1"
  }
}

class geDesigns {
  /**
   * getEra - Gets the currently set era based on 'location'
   * 
   * If not found or invalid, returns Chromium 1 instead.
   */

  static getEra() {
      let prefChoice = gePrefUtils.tryGet("geckertino.design.era").string;
      if (!prefChoice || !Object.keys(geEras).includes(prefChoice))
          return "1";

      return prefChoice;
  }

  
  /**
   * applyEra - Applies the selected era to the browser and supported pages
   */

  static applyEra() {
    let prefChoice = geDesigns.getEra();

    // Don't continue if acting on the browser and the current era == the new era
    if (document.URL == "chrome://browser/content/browser.xhtml" && prefChoice == lastEra)
      return;

    // Add and remove gksafari-(designid) classes based on the selected design
    let order = Object.keys(geEras); // a hack but hey
    let mindn = order.indexOf(geEras[prefChoice]["minver"]);
    let maxdn = order.indexOf(prefChoice);
    for (const [x, i] of order.entries()) { // x is the index
        const attr = "gksafari-" + i;
        if (x >= mindn && x <= maxdn) {
            document.documentElement.setAttribute(attr, "");
        } else {
            document.documentElement.removeAttribute(attr);
        }
    } 
    lastEra = prefChoice;
  }
}

window.addEventListener("load", geDesigns.applyEra);

// Automatically change Geckertino Design when the setting changes
const geDsnObserver = {
	observe: function (subject, topic, data) {
		if (topic == "nsPref:changed")
			geDesigns.applyEra();
	},
};
Services.prefs.addObserver("geckertino.design.era", geDsnObserver, false);