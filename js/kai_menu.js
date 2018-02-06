$(document).ready(function($) {

	var navigation,
		kaiNav = $('.kai-nav'),
		kaiMenu = $('.kai-menu'),

	// опции которые можно менять
	opts = {
		timeTransition: 2000, // время аннимации элементов меню
		timeUp: 1100, // время скроллинга страницы после нажатия вверх
		searchAction: '#', // адрес сервера для запроса поиска
		searchMethod: 'GET', // метод запроса на сервер
		searchPlaceholder: 'start typing...', // подсказка для поиска
		iconToUp: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', // иконка для кнопки вверх
		colorLink: '#999999', // цвет ссылок и иконок
		colorHover: '#8accff' // цвет при наведении и активных ссылок
	}

		createMenu(); // line 29
		$(document).ready(function($) {
			customColor(); // line 49
		});
		createSearch(); // line 103
		createSocial(); // line 135
		createToUp(); // line 143
		hamburger(); // line 159
		moveScroll(); // line 211
		mobileVer(); // line 247

	function createMenu(){
		$('.kai-menu').css('background-color', opts.colorMenu);
		if( $('.kai-menu').find('.kai-nav') || $('.kai-menu').find('.kai-social') ){
			navigation = createEl('div');
			$(navigation).addClass('kai-navigation');
			$('.kai-menu').append($(navigation));
			$('.kai-nav').prependTo($('.kai-navigation'));
			$('.kai-social').appendTo($('.kai-navigation'));
		}
	// Добавляет стили к логотипу.
		$('.kai-logo img').eq(0).addClass('big-logo');
		$('.kai-logo img').eq(1).addClass('mini-logo');
	// Максимальное кол картинок лого 2шт, другие удаляються
		$('.kai-logo img').each(function(i,el){
			if( $(el).attr('class') != 'big-logo' && $(el).attr('class') != 'mini-logo'){
				$(el).remove();
			}
		});
	}
// цвета user
	function customColor() {
		$('.kai-menu li').find('a').css('color', opts.colorLink);
		$('.kai-menu li').find('i').css('color', opts.colorLink);
		$('.kai-navigation li a').eq(0).addClass('active custom-color');
		$('.custom-color').css('color', opts.colorHover);
// Делает активной ссылку на ноторую кликнули
		$('.kai-navigation li>a').on('click',function(){
			for (var i = 0; i < $('.kai-navigation li > a').length; i++) {
				$('.kai-navigation li>a').eq(i).removeClass('active');
				$('.custom-color').css('color', opts.colorLink);
				$('.kai-navigation li>a').removeClass('custom-color');
			}
			$(this).addClass('active');
			$(this).addClass('custom-color');
			$('.custom-color').css('color', opts.colorHover);
				
		});
	// эффекты при наведении
		$('.kai-menu li').hover(
			function(){
				$(this).find('a').css('color', opts.colorHover);
				$(this).find('i').css('color', opts.colorHover);
			},
			function(){
				if( $(this).find('a').hasClass('custom-color') ){
					$(this).find('a').css('color', opts.colorHover);
				} else {
					$(this).find('a').css('color', opts.colorLink);
				}
				$(this).find('i').css('color', opts.colorLink);
			}
		);
	// эффект при наведении на кнопку вверх
		$('#toUp-btn').hover(
			function(){
				if( $(this).hasClass('animate') ){
					$('#toUp-btn.animate').css('color', opts.colorLink);
				} else {
					$(this).css('color', '#ffffff');
				}
				$(this).css('color', '#ffffff');	
			},
			function(){
				if( $(this).hasClass('animate') ){
					$('#toUp-btn.animate').css('color', opts.colorHover);
				}else {
					$(this).css('color', opts.colorHover);
				}
				$(this).css('color', opts.colorHover);
			}
		);
	}

	// Создает оверлей с поиском
	function createSearch(){
		$('.kai-menu .search-icon').wrapInner('<i class="fa fa-search" aria-hidden="true"></i>')
		if( $('.kai-menu').find('.search-icon') ){
			var kaiSearch = createEl('div'),
				searchInput = createEl('div'),
				overlay = createEl('div'),
				searchForm = createEl('form'),
				input = createEl('input'),
				btnClose = createEl('a');

			$(kaiSearch).addClass('kai-search no_active');
			$(searchInput).addClass('search-input');
			$(overlay).addClass('overlay-search');

			$(searchForm).attr('action', opts.searchAction);
			$(searchForm).attr('method', opts.searchMethod);
			$(input).attr('type', 'text');
			$(input).attr('placeholder',opts.searchPlaceholder)
			$(btnClose).attr('href', '#');
			$(btnClose).addClass('kai-btn-close');
			$(btnClose).wrapInner('<i class="fa fa-times" aria-hidden="true"></i>');

			$('.kai-menu').after($(kaiSearch));
			$(kaiSearch).append($(searchInput));
			$(searchInput).append($(overlay));
			$(searchInput).append($(searchForm));
			$(searchForm).prepend($(input));
			$(searchForm).append($(btnClose));
			$('.kai-search .overlay-search').css('background-color', opts.colorHover);
		}
	}
	// Создает список соц сетей
	function createSocial(){
		$('.kai-social li').each(function(i,el){
			if( i > 3 ){
				$(el).remove();
			}
		});
	}
	// Создает кнопку на скролинга на верх
	function createToUp(){
		if( $('.kai-menu') ){
			var toUp = createEl('a'),
				border = createEl('span');
			$(toUp).attr('ID', 'toUp-btn');
			$(toUp).attr('href', '#');
			$(border).addClass('border');

			$(document.body).append($(toUp));
			$(toUp).append($(border));
			$(toUp).append(opts.iconToUp);
			$('#toUp-btn').css('color', opts.colorHover);
			$('.border').css('background-color', opts.colorHover);
		}
	}

	function hamburger(){
		var hamburger = createEl('div');
			$(hamburger).addClass('bnt-hamburger');
			$(hamburger).wrapInner('<div class="bar"></div>');
			$('.kai-menu').prepend($(hamburger));
			$('.bnt-hamburger > .bar').clone().appendTo($('.bnt-hamburger'));
			$('.bnt-hamburger .bar:last-child').clone().appendTo( $('.bnt-hamburger'));
			$('.bnt-hamburger .bar').css('background-color', opts.colorHover);

		$('.bnt-hamburger').on('click',
			function(){
				$('.bar').toggleClass('animate');
				$('.kai-navigation.active').css({
// анимация при закрытии - OFF
					// 'transition-delay': opts.timeTransition/2 + 'ms',
					// '-webkit-transition-delay': opts.timeTransition/2 + 'ms'
				});
				leftDownMenu(); // line 275
				animateMenu(); // line 282
			}); 
	}

	// открывает окно поиска при клики на иконку поиска
	$('.kai-menu .search-icon').on('click',
			function(){
				getDisplay('.kai-menu .kai-right-icon','none');
				getDisplay('.bnt-hamburger','none');
				getDisplay('.kai-menu .kai-logo','none');
				getDisplay('.kai-menu .kai-nav','none');
				
				$('.kai-search').removeClass('no_active');
				$('.kai-search').addClass('active');
			});
	// закрывает окно поиска
	$( '.kai-search .kai-btn-close' ).on('click',
			function(){
				$('.kai-search input').val('');
				getDisplay('.kai-menu .kai-right-icon','block');
				getDisplay('.bnt-hamburger','block');
				getDisplay('.kai-menu .kai-logo','block');
				getDisplay('.kai-menu .kai-nav','flex');

				$('.kai-search').removeClass('active');
				$('.kai-search').addClass('no_active');
			});
	// кнопка #toUp-btn скролит плавно страницу вверх
	$('#toUp-btn').on('click', function(){
		$('html, body').animate({
			scrollTop: 0
		}, opts.timeUp, "linear");
	});

	// приводит в движения элементы при скролинге
	function moveScroll(){
		$( window ).scroll(function(){
			if( $(window).scrollTop() != 0 ){
				$('.kai-menu').css({
					'height': '65px',
					'background-color': 'rgba(255,255,255,0.9)'
				});
				$('.kai-menu').addClass('scroll-down');
			} else{
				$('.kai-menu').css({
					'height': '85px',
					'background-color': 'rgba(255,255,255,1)'
				});
				$('.kai-menu').removeClass('scroll-down');
			}
	// появление и анимирование кнопки Скролинга страницы вверх
			if( $(window).scrollTop() > $( window ).height() ){
				$('#toUp-btn').addClass('active');
			}else{
				$('#toUp-btn').removeClass('active');
			}
	// Если скрол достиз footer		
			if( $(window).scrollTop() == $(document).height() - $(window).height() ){
				$('#toUp-btn').removeClass('active');
				$('#toUp-btn').addClass('animate');
				// $('#toUp-btn').addClass('custom-btn');
			}
			else{
				$('#toUp-btn').removeClass('animate');
				// $('#toUp-btn').removeClass('custom-btn');

			}
		});
	}

	// мобильная версия меню начинается с min-width 
	function mobileVer(){
		if( $( window ).width() > 900 ){
			$('.kai-navigation.active').removeClass('active');
			$('.kai-logo').css('width','130px');
		}
		$(window).resize(function() {
			if( $( window ).width() > 900 ){
				$('.kai-navigation.active').removeClass('active');
				$('.bar').removeClass('animate');
				$('.kai-menu').removeClass('scroll-down');
			}
			if( $( window ).width() < 900 ){
				$('.kai-menu').addClass('scroll-down');
				$('.kai-logo').css('width','auto');
			}
		});
	}

	// анимирует меню в мобильной версии
	function leftDownMenu(){
		$('.kai-navigation').toggleClass('active');
		$('.kai-navigation.active').css({
			'transition-delay': 50 + 'ms',
			'-webkit-transition-delay': 50 + 'ms'
		});
	}
	function animateMenu(){
		var allLi = $('.kai-navigation.active .kai-nav > li');
		for (var i = 0; allLi.length > i; i++) {
			var transitionDelay = ( (opts.timeTransition/allLi.length)/2 )*i;
			$(allLi).eq(i).css({
				'transition-delay': transitionDelay + 'ms',
				'-webkit-transition-delay': transitionDelay + 'ms'
			});
		}
	}
	
	// вспомогательная функция - меняет display на prop(любое свойство)
	function getDisplay(el,prop){
		return $(el).css( 'display', prop );
	}
	// вспомогательная функция - создает элемент
	function createEl(el){
		return document.createElement(el);
	}
});