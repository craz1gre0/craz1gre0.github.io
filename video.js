document.addEventListener("DOMContentLoaded", function() {

    alert("驚嚇警告！請按確定以繼續。\n這只是我想分享我做的東西不是作業");

    const thevideo = document.getElementById("thevideo");
    const othervideo = document.getElementById("othervideo");
    const mobilevideo = document.getElementById("mobilevideo");
    const mobilemainvideo = document.getElementById("mobilemainvideo");
    const h1 = document.getElementById("h1");
    const p1 = document.getElementById("p1");

    const backh1 = h1.textContent;
    const backp1 = p1.textContent;

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isPortrait() {
        return isMobile() && window.matchMedia("(orientation: portrait)").matches;
    }
    
    function initMobileVideo() {
        thevideo.style.display = "none";
        mobilemainvideo.style.display = "block";
        mobilemainvideo.play();
    }

    // p
    function playOtherVideo() {
        if (isPortrait()) {
            mobilemainvideo.style.display = "none";
            mobilevideo.style.display = "block";
            mobilevideo.muted = false;
            mobilevideo.play();
        } else {
            thevideo.style.display = "none";
            othervideo.style.display = "block";
            othervideo.muted = false;
            othervideo.play();
        }
        h1.textContent = " ";
        p1.textContent = " ";
    }

    // m
    if (isMobile()) {
        initMobileVideo();
    } else {
        thevideo.style.display = "block";
        thevideo.play();
    }

    // c
    thevideo.addEventListener("click", playOtherVideo);
    mobilemainvideo.addEventListener("click", playOtherVideo);
    h1.addEventListener("click", playOtherVideo);
    p1.addEventListener("click", playOtherVideo);

    //end
    othervideo.addEventListener("ended", function() {
        othervideo.muted = true;
        othervideo.style.display = "none";
        thevideo.style.display = "block";
        h1.textContent = backh1;
        p1.textContent = backp1;
        thevideo.play();
    });

    //end2
    mobilevideo.addEventListener("ended", function() {
        mobilevideo.muted = true;
        mobilevideo.style.display = "none";
        mobilemainvideo.style.display = "block";
        h1.textContent = backh1;
        p1.textContent = backp1;
        mobilemainvideo.play();
    });
});
