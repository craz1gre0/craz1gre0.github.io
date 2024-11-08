document.addEventListener("DOMContentLoaded", function() {
    const thevideo = document.getElementById("thevideo");
    const othervideo = document.getElementById("othervideo");
    const mobilevideo = document.getElementById("mobilevideo")
    const h1 = document.getElementById("h1");
    const p1 = document.getElementById("p1");

    const backh1 = h1.textContent;
    const backp1 = p1.textContent;

    // 檢查是否為行動裝置
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 檢查是否為橫向模式且在行動裝置上
    function isportrait() {
        return isMobile() && window.matchMedia("(orientation:  portrait)").matches;
    }

    // s
    function playoth() {
        // 如果是行動裝置的橫向模式，則執行影片控制
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