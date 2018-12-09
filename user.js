// ==UserScript==
// @name         FB Ads Remover
// @namespace    https://mthie.com/
// @version      0.2
// @description  Remove FB Ads posts
// @author       Martin Thielecke
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function removeAds() {
        let posts = document.querySelectorAll(".userContentWrapper");
        for(let post of posts) {
            let links = post.querySelectorAll("a");
            for(let link of links) {
                let tags = link.querySelectorAll("*");
                var content = "";
                for(let tag of tags) {
                    if(tag.offsetHeight > 0 && tag.offsetWidth > 0) {
                        content += [].reduce.call(tag.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
                    }
                }
                if(content.trim() == "Sponsored") {
                    console.log("Removed ad!", post);
                    post.parentElement.removeChild(post);
                }
            }
        }
    }

    removeAds();
    window.addEventListener("scroll", removeAds);
    window.addEventListener("resize", removeAds);
})();
