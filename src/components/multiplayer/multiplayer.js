import { preferences } from "./preferences"

export function init() {
    const isVideo = preferences.isVideo;

    let el = document.getElementById("multiplayerav");
    if (el) {
        el.addEventListener("click", function(ev){multiplayerSwitch(ev.target.checked);});
        el.checked = isVideo;
        //console.log("multiplayerInit: Setting video: " + isVideo);
    }

    let players = document.querySelectorAll('.multiplayer');
    players.forEach(div => {
        if (isVideo)
            addYoutube(div);
        else
            addVideojs(div);
    });

    addTimeLinks();
}

function multiplayerSwitch(isVideo)
{
    //console.log("multiplayerSwitch - Start: isVideo=" + isVideo);
    preferences.setIsVideo(isVideo);
    let containers = document.querySelectorAll('.multiplayer');
    containers.forEach(container => { switchplayer(container, isVideo); });
    //console.log("multiplayerSwitch - End: isVideo=" + isVideo);
}

function getFirstElement(container, tag) {
    let array = container.getElementsByTagName(tag);
    return array.length ? array[0] : null;    
}

async function switchplayer(container, isVideo)
{
    //console.log("switchplayer - Start: isVideo=" + isVideo);

    if (isVideo != preferences.isVideo) {
        //console.log( "switchplayer: Do nothing because switch is old. isVideo=" + isVideo)
        return;
    }

    let isPlaying = false;
    let offset = 0;

    let nmArray = container.querySelectorAll('.multiplayernomedia');
    if (nmArray.length)
        container.removeChild(nmArray[0]);
    
    if (isVideo)
    {
        // Switch VideoJs to YouTube
        let vjElement = getFirstElement(container, 'video-js')
        if (vjElement)
        {
            //console.log("Have videojs: " + vjElement)
            let vjPlayer = videojs(vjElement);
            isPlaying = !vjPlayer.paused();
            offset = vjPlayer.currentTime();
            //vjPlayer.style.display = 'none';
            container.removeChild(vjElement);
        }
        addYoutube(container, isPlaying, offset);
    }
    else {
        // Switch YouTube to VideoJs
        let ytElement = getFirstElement(container, 'lite-youtube');
        if (ytElement)
        {
            // Get the YouTube player status
            if (getFirstElement(ytElement, 'iframe')) {
                //console.log("Have youtube: " + ytElement);
                let ytPlayer = await ytElement.getYTPlayer();
                isPlaying = ytPlayer.getPlayerState() == 1;
                offset = ytPlayer.getCurrentTime();
                //ytPlayer.style.display = 'none'; No! - Causes the player to play
            }
            // else - the player wasn't played
            // Delete the YouTube player
            container.removeChild(ytElement);
        }
        addVideojs(container, isPlaying, offset);
    }
}

async function addYoutube(container, autoplay = false, offset = 0)
{
    if (!preferences.isVideo) {
        //console.log( "addYoutube: Don't add video in audio mode");
        return;
    }

    let youtubeid = container.getAttribute("data-youtubeid");
    if (youtubeid == null) {
        addNoMedia(container, true);
        return;
    }

    // Don't check if there'a already an element because it may be in the process of being destroyed
    let ytElement = document.createElement("lite-youtube");
    ytElement.setAttribute("style", "background-image: url(\"" + container.getAttribute("data-poster") ) + "\")";
    ytElement.setAttribute("class", container.getAttribute("class"));
    ytElement.classList.remove("multiplayer");
    ytElement.setAttribute("videoid", youtubeid);
    ytElement.setAttribute("js-api", "true");
    ytElement = container.appendChild(ytElement);

    //console.log("added youtube " + ytElement)
    if (offset)
    {
        //console.log("Skip to " + offset + " playing=" + autoplay)
        let ytPlayer = await ytElement.getYTPlayer();
        ytPlayer?.seekTo(offset, true);                
        if (autoplay)
            ytPlayer?.playVideo();
        else
            ytPlayer?.pauseVideo();
    }
}

function addVideojs(container, autoplay = false, offset = 0)
{
    //console.log("addVideojs - start")
    if (preferences.isVideo) {
        //console.log( "addYoutube: Don't add video in audio mode")
        return;
    }

    let audiourl = container.getAttribute("data-audiourl");
    if (audiourl == null) {
        addNoMedia(container, false);
        return;
    }

    // Don't check if there'a already an element because it may be in the process of being destroyed
    let vjElement = document.createElement("video-js");
    vjElement.setAttribute("controls", true);
    vjElement.setAttribute("fluid", true);
    let source = document.createElement('source');
    source.setAttribute("src", audiourl);
    source.setAttribute("type", "audio/mp4");
    vjElement.appendChild(source);

    let transcripturl = container.getAttribute("data-transcripturl");
    if (transcripturl) {
        const track = document.createElement('track');
        track.setAttribute("src", transcripturl);
        track.setAttribute("kind", "captions");
        track.setAttribute("srclang", "en");
        track.setAttribute("label", "English");
        track.setAttribute("default", "true");
        vjElement.appendChild(track);
    }

    vjElement.setAttribute("poster", container.getAttribute("data-poster"));

    let vjPlayer = videojs(
        vjElement,
        {
            html5: { preloadTextTracks: false },
            controlBar: { skipButtons: { forward: 5, backward: 10 } },
            playbackRates: [0.5, 1, 1.5, 2],
            autoplay: autoplay
        }
    );

    if (offset)
        vjPlayer.currentTime(offset);

    container.appendChild(vjElement);
}

function addNoMedia(container, isVideo) {
    let el = document.createElement("div");
    el.setAttribute("class", "multiplayernomedia");
    el.innerHTML = "<div style=\"padding: 10px; border-radius: 10px; border-style: solid; background-color: #ff6060; font-size: 1.5em; font-weight: bold; text-align: center;\">There is currently no " + (isVideo ? "video" : "audio") + " version available for this episode</div>";
    let attribute = container.getAttribute("data-poster");
    container.appendChild(el);
}

function addTimeLinks() {
    let timelinks = document.querySelectorAll('.timelinks time');
    timelinks.forEach(div => {
        div.classList.add("timelink");
        div.addEventListener("click", function (ev) {
            let ta = ev.target.innerHTML.split(':');
            let ts = 0;
            ta.forEach(t => ts = ts * 60 + Number(t));
            multiplayerSeek(ts)
        });
    });
}

async function multiplayerSeek(seconds)
{
    if (preferences.isVideo) {
        let ytArray = document.getElementsByTagName('lite-youtube');
        if (ytArray.length)
        {
            // The youtube player is active
            let ytPlayer = await ytArray[0].getYTPlayer();
            ytPlayer?.seekTo(seconds, true);
            ytPlayer?.playVideo();
        }
    }
    else {
        let vjArray = document.getElementsByTagName('video-js');
        if (vjArray.length)
        {
            // The videoJs player is active
            let vjPlayer = videojs(vjArray[0]);
            vjPlayer.currentTime(seconds);
            vjPlayer.play();
    }
  }
}
