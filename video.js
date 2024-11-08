document.addEventListener("DOMContentLoaded", function() {
    const thevideo = document.getElementById("thevideo");
    const othervideo = document.getElementById("othervideo");
    const mobilevideo = document.getElementById("mobilevideo")
    const h1 = document.getElementById("h1");
    const p1 = document.getElementById("p1");

    const backh1 = h1.textContent;
    const backp1 = p1.textContent;

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isportrait() {
        return isMobile() && window.matchMedia("(orientation:  portrait)").matches;
    }

    // s
    function playoth() {
        
        if (isportrait()) {
            thevideo.style.display = "none";
            mobilevideo.style.display = "block";
            mobilevideo.muted = false;
            mobilevideo.play();
            h1.textContent = " ";
            p1.textContent = " ";
        }
        else{
            thevideo.style.display = "none";
            othervideo.style.display = "block";
            othervideo.muted = false;
            othervideo.play();
            h1.textContent = " ";
            p1.textContent = " ";
        }
        
    }

    // p
    thevideo.addEventListener("click", playoth);
    h1.addEventListener("click", playoth);
    p1.addEventListener("click", playoth);

    // end
    othervideo.addEventListener("ended", function() {
        othervideo.muted = true;
        othervideo.style.display = "none";
        thevideo.style.display = "block";
        h1.textContent = backh1;
        p1.textContent = backp1;
        thevideo.play();
    });
    //end2
    // end
    mobilevideo.addEventListener("ended", function() {
        mobilevideo.muted = true;
        mobilevideo.style.display = "none";
        thevideo.style.display = "block";
        h1.textContent = backh1;
        p1.textContent = backp1;
        thevideo.play();
    });
});
