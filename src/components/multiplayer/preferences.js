// Cookie handling from artnikpro's answer at
// https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie-with-javascript
const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}
  
const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}
  
const deleteCookie = (name, path) => {
    setCookie(name, '', -1, path)
}

class Preferences {
    constructor() {
        this.useCookies = false;
        this.isVideo = true;
    }

    init(useCookies = false, isVideo = true) {
        //console.log("Init. useCookies=" + useCookies + ", isVideo=" + isVideo);
        this.useCookies = useCookies;
        this.isVideo = isVideo;
        if (this.useCookies) {
            let cookie = getCookie("isVideo");
            if (cookie != "")
                this.isVideo = cookie == "1";
        }
    }

    setUseCookies(useCookies) {
        //console.log("setUseCookies=" + useCookies);
        this.useCookies = useCookies;
        if (useCookies)
            setCookie("isVideo", preferences.isVideo ? "1" : "0", 365);
        else
            deleteCookie("isVideo");
    }

    setIsVideo(isVideo) {
        //console.log("setIsVideo=" + isVideo);
        this.isVideo = isVideo;
        if (this.useCookies)
          setCookie("isVideo", isVideo ? "1" : "0", 365);
    }
}

export const preferences = new Preferences();
