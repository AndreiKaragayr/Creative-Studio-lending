$(document).ready(function($) {
	
	var flag = false,

	// Опции которые можно менять
	opts = {
		offset: 150, // скролинг появится раньше на 100px
		transitionTnsf: 2000, // время скольжения progress-bar
		cotorSubtitle: '#8accff', // цвет маленого заголовка
		colorHeading: '#222222', // цвет большого заголовка
		colorBar: '#8accff' // цвет прогрес бара
	}

	createWrImage(); // Line 19
	createWrHeading(); // Line 35
	createWrText(); // Line 52
	createWrappArea(); // Line 68
	createBar(); // Line 93
	scrollpage(); // Line 114
	getResponsMobile(); // Line 171
	 
	function createWrImage(){
		for (var i = 0; i < $('.area-scroll').length; i++) {
			var wrImage = $('.area-scroll').eq(i).find('.wr-image')
			if( i == 0 ){
				$(wrImage).wrap(
					'<div class="col-8 align-middle card-image"><div class="col-inner"></div></div>'
				);
			} else {
			$(wrImage).wrap(
				'<div class="col-6 align-middle card-image"><div class="col-inner"></div></div>'
			);
			}
		}
		$('.area-scroll .wr-image img').addClass('size-full');
	}

	function createWrHeading(){
		for (var i = 0; i < $('.area-scroll').length; i++) {
			var wrHeading = $('.area-scroll').eq(i).find('.wr-heading')
			if( i == 0 ){
				$(wrHeading).wrap(
					'<div class="col-4 align-middle card-content"><div class="col-inner"></div></div>'
				);
			} else {
			$(wrHeading).wrap(
				'<div class="col-6 align-bottom padding-bottom card-content"><div class="col-inner"></div></div>'
			);
			}
			$(wrHeading).children().eq(1).addClass('title-heading');
		}
		$('.area-scroll').find('.wr-heading').children().addClass('subtitle');
	}

	function createWrText(){
		$('.area-scroll').find('.wr-text').wrap(
			'<div class="row bg-white"><div class="col-12"><div class="col-inner"></div></div></div>'
			);

		for (var i = 0; i < $('.area-scroll').length; i++) {
			$('.area-scroll').eq(i).find($('.row.bg-white')).appendTo($('.card-content > .col-inner').eq(i));
	// ищет btn-area тогда она перемещается в соответственный блок
			if( $('.area-scroll').eq(i).find('.btn-area') ){
				$('.area-scroll').eq(i).find('.btn-area').appendTo($('.area-scroll').eq(i).find('.wr-text'));
			}
		}
		$('.area-scroll').find('.wr-text').children().css('margin-bottom','20px');
		$('.btn-area').wrapInner('<span></span>');
	}

	function createWrappArea(){
		$('.area-scroll').wrapInner('<div class="row font-null"></div>');
		row = $('.area-scroll > .row');
		for (var i = 0; i < $('.area-scroll').length; i++) {
			if( i != 0 ){
				$('.area-scroll').eq(i).find('.row.font-null').addClass('width-section');
			}
			if( i%2 == 0 ){
				$('.area-scroll').eq(i).find('.card-image').prependTo($(row).eq(i));
				$('.area-scroll').eq(i).find('.card-content').appendTo($(row).eq(i));
				$('.area-scroll').eq(i).find('.card-content').addClass('in-right');
				$('.area-scroll').eq(i).find('.wr-heading').addClass('text-left');
				$('.area-scroll').eq(i).find('.wr-text').addClass('text-left');
			} else{
				$('.area-scroll').eq(i).find('.card-image').appendTo($(row).eq(i));
				$('.area-scroll').eq(i).find('.card-content').prependTo($(row).eq(i));
				$('.area-scroll').eq(i).find('.card-content').addClass('in-left');
				$('.area-scroll').eq(i).find('.wr-heading').addClass('text-right');
				$('.area-scroll').eq(i).find('.wr-text').addClass('text-right');
			}
			$('.area-scroll').eq(i).find('.subtitle').css('color', opts.cotorSubtitle );
			$('.area-scroll').eq(i).find('.title-heading').css('color', opts.colorHeading );
			$('.area-scroll').eq(i).find('.title-heading').removeClass('subtitle');
		}
	}

	function createBar(){
		$('.area-scroll').each(function(i,el){
			if( $(el).find('.wr-progress-bar') ){
				$(el).find('.wr-progress-bar').insertAfter($(this).find('.wr-text'));
			}
		});
	// Ищет родителя wr-progress-bar с классом area-scroll и добавляет progress-bar для анимации счетчиков
		$('.wr-progress-bar').parents('.area-scroll').addClass('area-progress-bar');
		$('.wr-progress-bar').wrapInner('<div class="name-bar"></div>');
	// создает нужные классы для содержимого progress-bar
		var strong = createEl('strong'),
			wrBar = createEl('div');
			$(strong).addClass('counter');
			$(wrBar).addClass('wr-bar');
			$(wrBar).wrapInner('<div class="bar"></div>');
			$('.wr-progress-bar .name-bar').append($(strong));
			$('.wr-progress-bar').append($(wrBar));
			$('.wr-bar .bar ').css('background-color', opts.colorBar);
	}
	// Добавляет анимацию на скролинг
	function scrollpage(){
		$(window).scroll(function() {
			$('.area-scroll').each(function(e){
	// Если скролинг достиг высоты area-scroll (с учетом offset) включается анимация
				if( $(window).scrollTop() > $(this).offset().top - opts.offset ){
					$(this).addClass('active');
				}
			});
	// включает анимацию счетчиков и линий
			if( $(window).scrollTop() > $('.area-scroll.area-progress-bar').offset().top - opts.offset){
	// останавливает счетчики чтоб они не крутились за скролом
				if( flag != true ){
					progressBar(); // Line 135
					counterMove(); // Line 153
					flag = true;
				}
			}
		});
	}
	// Приводит в движение progress-bar до заданых критерий в data
	function progressBar(){
		$('.wr-progress-bar').each(function(){

			var dataValue = $(this).attr( 'data-value' ),
				dataUnit = $(this).attr( 'data-unit' ),
				translateX = 100 - dataValue;

			$(this).find('.bar').css({
				'-webkit-transform': 'translateX('+ -translateX + '%)',
				'-ms-transform': 'translateX('+ -translateX + '%)',
				'transform': 'translateX('+ -translateX + '%)',
				'-webkit-transition': 'transform ' + opts.transitionTnsf + 'ms ease-out',
				'-ms-transition': 'transform ' + opts.transitionTnsf + 'ms ease-out',
				'transition': 'transform ' + opts.transitionTnsf + 'ms ease-out'
			});
		});
	}
	// Приводит в движение счетчики до заданных критерий в data
	function counterMove(){
		var time = opts.transitionTnsf/100;
		$('.wr-progress-bar').each(function(i,el){
			var count = 0,
				dataValue = $(el).attr( 'data-value' ),
				dataUnit = $(el).attr( 'data-unit' );
			var intervalID = setInterval(function(){
				if( count > dataValue ){
					clearInterval(intervalID);
					count = 0;
				}else {
					$(el).find('.counter').text(count + ' ' + dataUnit);
				}
				count++;
			}, time);
		});
	}

	function getResponsMobile(){
		getMobilVer(); // Line 178	
		$( window ).resize(function (){
			getMobilVer(); // Line 178
		});
	}

	function getMobilVer(){
		if( $(window).outerWidth() < 970 ){
			$('.area-scroll').find('.card-image').addClass('col-md');
			$('.area-scroll').find('.card-content').addClass('col-md');
			$('.in-right').css('right', '0px');
			$('.in-left').css('left', '0px');	
		} else {
			$('.area-scroll').find('.card-image').removeClass('col-md');
			$('.area-scroll').find('.card-content').removeClass('col-md');
			$('.in-right').css('right', '50px');
			$('.in-left').css('left', '50px');
		}
	}

	// Вспомогательная функция
	function createEl(el){
		return document.createElement(el);
	}
});	


