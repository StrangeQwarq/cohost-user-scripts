// ==UserScript==
// @name     Bsky Video Volume Slider
// @version  1
// @grant    none
// @match    https://bsky.app/*
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
  let hasNewVideos = false;
  
	for (let m of mutations) {
		if (m.type === 'childList') {
			for (let m2 of m.addedNodes) {
				if (!m2 || !('querySelector' in m2)) continue;
				let videoElements = m2.querySelectorAll('video');
        hasNewVideos = (videoElements && videoElements.length) || hasNewVideos;
			}
		}
	}
  
  if (hasNewVideos) {
    setTimeout(addVolumeSliders, 0);
  }
});

observer.observe(document.documentElement || document.body, {attributes: true, childList: true, subtree: true});

function addVolumeSliders() {
  const sliderClassName = '_bsky_volume_slider';

  let muteButtons = document.querySelectorAll("[aria-label='Unmute'],[aria-label='Mute']");
  for (let node of muteButtons) {
    if (node.nextSibling.classList.contains(sliderClassName)) {
    	// slider already exists for this video
      continue;
    }
    
    // this is very silly
    let vid = node.parentNode.parentNode.parentNode.parentNode.querySelector("video");

    let slider = document.createElement("input");
    slider.type = 'range';
    slider.min = 0;
    slider.max = 1;
    slider.step = 'any';
    slider.style.width = '5rem';
    slider.classList.add(sliderClassName);
    slider.addEventListener('input', (event) => {
	    vid.volume = event.target.value;
    });

    node.after(slider);
    node.style.display = 'none';
  }
}

addVolumeSliders();
