"use strict";

var slidbarBody = document.querySelector('.slidbar-body')

openSlidbar();
closeSlidbar();

function openSlidbar(){
	var openSb = getSelector('.slibar-icon');
	var slidbar = getSelector('.slidbar');
	var slidbarBody = getSelector('.slidbar .slidbar-body');
	var overlay = getSelector('.page-overlay');
	openSb.onclick = function(){
		slidbar.classList.remove('no_active');
		slidbar.classList.add('active');
		overlay.style.zIndex = '999';
		overlay.style.opacity = '0.3';
	}
}

function closeSlidbar(){
	var closeSb = getSelector('.slidbar .close');
	var slidbar = getSelector('.slidbar');
	var overlay = getSelector('.page-overlay');
	closeSb.onclick = function(){
		slidbar.classList.remove('active');
		slidbar.classList.add('no_active');
		overlay.style.zIndex = '-1';
		overlay.style.opacity = '0';
	}
	overlay.onclick = function(){
		slidbar.classList.remove('active');
		slidbar.classList.add('no_active');
		overlay.style.zIndex = '-1';
		overlay.style.opacity = '0';
	}
}

mouseMove();
function mouseMove(){
	slidbarBody.onmouseenter = function(){
	if (slidbarBody.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        slidbarBody.addEventListener("wheel", onWheel);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        slidbarBody.addEventListener("mousewheel", onWheel);
      } else {
        // Firefox < 17
        slidbarBody.addEventListener("MozMousePixelScroll", onWheel);
        // console.log('33')
      }
    } else { // IE8-
      slidbarBody.attachEvent("onmousewheel", onWheel);
    }

    // Это решение предусматривает поддержку IE8-
    function onWheel(e) {
      e = e || window.event;

      var delta = e.deltaY || e.detail || e.wheelDelta;

      if( delta == 100 ){
		slidbarBody.style.transform = 'translateY(-20%)';
      } else {
      	slidbarBody.style.transform = 'translateY(0%)';
      }
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }


	}
	// slidbarBody.onmouseleave = function(){
	// 	console.log('22');
	// }
}

//вспомогательная функция - достает селектор
function getSelector(el){
	return document.querySelector(el);
}