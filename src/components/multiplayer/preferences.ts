const safeRun = (fn) => {
    try {
        return fn();
    } catch (e) {
        console.warn('preferences:', e);
        return false;
    }
};

class Preferences {
    isConsent: boolean;
    isVideo: boolean;

    constructor() {
        this.isConsent = false;
        this.isVideo = true;
    }

    getItem(key) {
        return safeRun(() => localStorage.getItem(key)) || '';
    }
    setItem(key, value) {
        safeRun(() => localStorage.setItem(key, value));
    }
    removeItem(key) {
        safeRun(() => localStorage.removeItem(key));
    }

    init(isConsent = false, isVideo = true) {
        //console.log('preferences.init. Parameters: isConsent=' + isConsent + ', isVideo=' + isVideo);
        this.isConsent = isConsent;
        this.isVideo = isVideo;
        if (this.isConsent) {
            const cookie = this.getItem('isVideo');
            //console.log('preferences.init cookie="' + cookie + '"');
            if (cookie != '')
                this.isVideo = cookie == '1';
        }
        //console.log('preferences.init. Resulting settings: isConsent=' + this.isConsent + ', isVideo=' + this.isVideo);
    }

    setIsConsent(isConsent) {
        //console.log('setIsConsent=' + isConsent);
        this.isConsent = isConsent;
        if (isConsent)
            this.setItem('isVideo', preferences.isVideo ? '1' : '0')
        else
            this.removeItem('isVideo');
    }

    setIsVideo(isVideo) {
        //console.log('preferences.setIsVideo: ' + isVideo);
        this.isVideo = isVideo;
        if (this.isConsent)
            this.setItem('isVideo', isVideo ? '1' : '0')
    }
}

export const preferences = new Preferences();
