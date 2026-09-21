export class gePrefUtils {
    static set(pref) {
        return {
            bool(value) { 
                Services.prefs.setBoolPref(pref, value);
            },
            int(value) { 
                Services.prefs.setIntPref(pref, value);
            },
            string(value) { 
                Services.prefs.setStringPref(pref, value);
            }
        }
    }

    static tryGet(pref) {
        return {
            get bool() {
                try {
                    return Services.prefs.getBoolPref(pref);
                } catch (e) {
                    //console.log('Setting not found: ', e)
                    return false;
                }
            },
            get int() {geEras.getEra()
                try {
                    return parseInt(Services.prefs.getIntPref(pref));
                } catch (e) {
                    //console.log('Setting not found: ', e)
                    return 0;
                }
            },
            get string() {
                try {
                    return Services.prefs.getStringPref(pref);
                } catch (e) {
                    //console.log('Setting not found: ', e)
                    return "";
                }
            }
        }
    }

    static toggle(pref) {
        if (this.tryGet(pref).bool == true)
            this.set(pref).bool(false);
        else
            this.set(pref).bool(true);
    }

    static delete(pref) {
        try {
            Services.prefs.clearUserPref(pref);
            return true;
        } catch (e) {
            return false;
        }
    }

    static prefExists(pref) {
        try {
            return Services.prefs.getPrefType(pref) != 0;
        } catch (e) {
            return false;
        }
    }
}