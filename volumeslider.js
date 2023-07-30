// ==UserScript==
// @name        Volume Slider
// @version     1
// @grant       none
// @match       https://cohost.org/*
// @description adds a volume slider to each audio post
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
	for (let m of mutations) {
  	if (m.type === 'childList') {
      for (let m2 of m.addedNodes) {
        if (!m2 || !('querySelector' in m2)) continue;
        let audio = m2.querySelector('audio');
        if (audio) {
         	addVolumeSlider(audio); 
        }
      }
    }
  }
});

observer.observe(document.documentElement || document.body, {attributes: true, childList: true, subtree: true});

function addVolumeSlider(audioElement) {
  let audioContainer = audioElement.parentNode;
  let audioControls = audioContainer.querySelector('.audio-controls');
  let fileName = audioContainer.querySelector('div > div > .flex-1');
  
  if (!fileName.dataset.fileName) {
  	fileName.dataset.fileName = fileName.innerText;
    
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0.0;
    slider.max = 1.0;
    slider.value = audioElement.volume;
    slider.step = 'any';
    slider.style.width = '5rem';
    slider.style.float = "right";
    
    if (audioControls) {
      slider.classList.value = audioControls.classList.value;
    }
    
    slider.addEventListener('input', (event) => {
      audioElement.volume = event.target.value;
    }, true, true);

    fileName.append(slider);
  }
}