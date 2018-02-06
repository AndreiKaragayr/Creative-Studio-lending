$(document).ready(function($) {
	
	var flag = false,

	// Опции которые можно менять
	opts = {
		timeCounter: 90, // время за которое счетчики достигнут значения
		iconFirst: '<i class="icon-heart"></i>', // сердце
		iconSecond: '<i class="icon-briefcase"></i>', // кейс
		iconThird: '<i class="icon-cup"></i>', // чашка
		iconFourth: '<i class="icon-hourglass"></i>', // часы
		colorIcon: '#6f94b1', // цвет иконок
		colorTitle: 'inherit', // цвет заголовков
		colorCount: '#222222' // цвет счетчиков
	}

	createBoard(); // line 18
	scrollpage(); // line 72

	function createBoard(){
		$('.kai-board').wrapInner(
			'<div class="row font-null"></div>'
			);
		$('.wr-progress-board').each(function(i,el){
			var spanIcon = createEl('span'),
				counterValue = createEl('div');
			$(el).wrap('<div class="col-md-12 col-md-6 col-3"><div class="col-inner"></div></div>');
			$(el).wrapInner('<div class="counter-title"></div>');
			
			$(spanIcon).addClass('icon-board');
			$(el).append($(spanIcon));
	// в содержимое счетчика добавляем data-value
			$(counterValue).addClass('counter-value');
			$(el).prepend( $(counterValue) );
			$('.counter-value').text(0);

			$('.counter-title').css('color', opts.colorTitle);
			$('.icon-board').css('color', opts.colorIcon);
			$('.counter-value').css('color', opts.colorCount);
	// всего может быть 4 счетчика - другие удаляются
			if( i>3 ){
				$(this).remove();
			}
		});
	// Добавляет иконки
		$('.wr-progress-board').eq(0).find('.icon-board').wrapInner(opts.iconFirst);
		$('.wr-progress-board').eq(1).find('.icon-board').wrapInner(opts.iconSecond);
		$('.wr-progress-board').eq(2).find('.icon-board').wrapInner(opts.iconThird);
		$('.wr-progress-board').eq(3).find('.icon-board').wrapInner(opts.iconFourth);
	}

	// Приводит в движение счетчики до заданных критерий в data-value
	function counterMove(){
		$('.wr-progress-board').each(function(i,el){
			var count = 0,
			dataValue = $(el).attr( 'data-value' ),
			time = opts.timeCounter/dataValue;
			var intervalID = setInterval(function(){
				count++;
				if( count > dataValue ){
					clearInterval(intervalID);
					count = 0;
				}
				else if(count == dataValue ){
					$(el).addClass('animate');
				}
				else {
					$(el).find('.counter-value').text(count);
				}
			}, time);
		});
	}

	// Добавляет анимацию на скролинг
	function scrollpage(){
		$(window).scroll(function() {
			var posY = $(window).height()/2;
	// Если скролинг достиг высоты .kai-board включаются счетчики
			if( $(window).scrollTop() > $('.kai-board').offset().top - posY ){
	// Если счетчик отработал он останавливается
				if( flag != true ){
					counterMove(); // line 51
					flag = true;
				}
			}
			
		});
	}

	// Вспомогательная функция - создает элемент
	function createEl(el){
		return document.createElement(el);
	}
});
		


