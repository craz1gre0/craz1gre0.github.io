document.addEventListener("DOMContentLoaded", function() {
    const thevideo = document.getElementById("thevideo");
    const othervideo = document.getElementById("othervideo");
    const h1 = document.getElementById("h1");
    const p1 = document.getElementById("p1");

    const backh1 = h1.textContent;
    const backp1 = p1.textContent;

    // check橫
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 檢查橫
    function isLandscape() {
        return isMobile() && window.matchMedia("(orientation: landscape)").matches;
    }

    // 橫p
    function setupVideoControls() {
        function playoth() {
            thevideo.style.display = "none";
            othervideo.style.display = "block";
            othervideo.muted = false;
            othervideo.play();
            h1.textContent = " ";
            p1.textContent = " ";
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
    }

    // if橫
    if (isLandscape()) {
        setupVideoControls();
    }

    // 監聽方向
    window.addEventListener("orientationchange", function() {
        if (isLandscape()) {
            setupVideoControls();
        } else {
            // if縱
            thevideo.pause();
            othervideo.pause();
            othervideo.style.display = "none";
            thevideo.style.display = "block";
        }
    });
});