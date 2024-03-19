---
// JavaScript for MultiPlayer.
// Include this in the page header.
// Call multiplayerInit() in the page onload
// See MultiPlayer.astro
import 'video.js/dist/video-js.min.css';
import 'lite-youtube-embed/src/lite-yt-embed.css';
// To import WITH processing:
// <script src="../../assets/video.js"></script>
// TODO: How to import directly from the node module?
// <script>import 'video.js/dist/video.js';</script>
// To import WITHOUT processing from :
// <script is:inline src={import.meta.env.BASE_URL + "video.js"}></script>
---
<script>import 'lite-youtube-embed';</script>
<script is:inline src={import.meta.env.BASE_URL + "video.min.js"}></script>
<script is:inline>
function multiplayerInit() {
    let el = document.getElementById("multiplayerav");
    if (el)
        el.addEventListener("click", function(ev){multiplayerSwitch(ev.target.checked);});

    let players = document.querySelectorAll('.multiplayer');
    players.forEach(div => {
        if (el.checked)
            addYoutube(div);
        else
            addVideojs(div);
    });

    addTimeLinks();
}

function multiplayerSwitch(isVideo)
{
  //console.log("Setting video=" + isVideo);
  let containers = document.querySelectorAll('.multiplayer');
  containers.forEach(container => { switchplayer(container, isVideo) });
}

async function switchplayer(container, isVideo)
{
    let isPlaying = false;
    let offset = 0;

    let nmArray = container.querySelectorAll('.multiplayernomedia');
    if (nmArray.length)
        container.removeChild(nmArray[0]);
    
    if (isVideo)
    {
        // Switch VideoJs to YouTube
        let vjArray = container.getElementsByTagName('video-js');
        if (vjArray.length)
        {
            vjElement = vjArray[0];
            // console.log("Have videojs: " + vjElement.id)
            let vjPlayer = videojs(vjElement);
            isPlaying = !vjPlayer.paused();
            offset = vjPlayer.currentTime();
            container.removeChild(vjElement);
        }
        addYoutube(container, isPlaying, offset);
    }
    else {
        let ytArray = container.getElementsByTagName('lite-youtube');
        if (ytArray.length)
        {
            // Switch YouTube to VideoJs
            let ytElement = ytArray[0];
            // console.log("Have youtube: " + ytElement.id);
            let ytPlayer = await ytElement.getYTPlayer();
            isPlaying = ytPlayer.getPlayerState() == 1;
            offset = ytPlayer.getCurrentTime();
            container.removeChild(ytElement);
        }
        addVideojs(container, isPlaying, offset);
    }
}

async function addYoutube(container, autoplay = false, offset = 0)
{
    let youtubeid = container.getAttribute("data-youtubeid");
    if (youtubeid == null) {
        addNoMedia(container, true);
        return;
    }
    // console.log("add Youtube to " + container.id)
    ytElement = document.createElement("lite-youtube");
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
    let audiourl = container.getAttribute("data-audiourl");
    if (audiourl == null) {
        addNoMedia(container, false);
        return;
    }
    //console.log("addVideojs")
    vjElement = document.createElement("video-js");
    vjElement.setAttribute("controls", true);
    vjElement.setAttribute("fluid", true);
    let source = document.createElement('source');
    source.setAttribute("src", audiourl);
    source.setAttribute("type", "audio/mp4");
    vjElement.setAttribute("poster", container.getAttribute("data-poster"));
    vjElement.appendChild(source);

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
    el = document.createElement("div");
    el.setAttribute("class", "multiplayernomedia");
    el.innerHTML = "<div style=\"padding: 10px; border-radius: 10px; border-style: solid; background-color: #ff6060; font-size: 1.5em; font-weight: bold; text-align: center;\">There is currently no " + (isVideo ? "video" : "audio") + " version available for this episode</div>";
    attribute = container.getAttribute("data-poster");
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
    let ytArray = document.getElementsByTagName('lite-youtube');
    if (ytArray.length)
    {
        // The youtube player is active
        let ytPlayer = await ytArray[0].getYTPlayer();
        ytPlayer?.seekTo(seconds, true);
        ytPlayer?.playVideo();
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
</script>