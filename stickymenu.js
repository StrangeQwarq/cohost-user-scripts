// ==UserScript==
// @name        Sticky Menu
// @version     1
// @grant       none
// @match       https://cohost.org/*
// @description makes the menu stick to the top of the screen instead of scrolling away
// ==/UserScript==
window.addEventListener('load', () => {
	let menuItems = document.querySelector('[role="menu"]');
  
	if (menuItems) {
		menuItems.style.position = 'sticky';
		menuItems.style.top = '5rem';
	}
});