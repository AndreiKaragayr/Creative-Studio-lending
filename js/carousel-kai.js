$(document).ready(function(){
	createBodyKai();

	var owl = $('.owl-carousel'),
	images = $('.owl-carousel img'),
	carouselKai = $('.carousel-kai'),
	url = null,
	bgDrop = $('.bg-drop'),
	prev = $('.controls-kai .left'),
	next = $('.controls-kai .right');
	timeoutID = 0;
	getResize();
	changeOwl();

// Deleted img and drop them in of bg
	images.each(function(i,el){
		$(el).remove();
		var wrappImg = createEl('div');
		$(wrappImg).css({
			'background-image': 'url(' + $(el).attr('src') + ')',
		});
		owl.append( $(wrappImg) );
	});

// on the documentation owl
	owl.owlCarousel({
		center: true, // 1 по центру
		loop: true, // по кругу
		items: 3, // видемые 3
		stagePadding: 20,
		margin: 0,
		responsive: {
			0: {
				items: 1.3,
				margin: 0,
				stagePadding: 0
			},
			640: {
				items: 1.5,
				stagePadding: 0
			},
			1024: {
				items: 2.5
			},
		} 
	});
// changed.owl.carousel -Документация плагина по Евенту (отслеживает извенения)
	function changeOwl(){
		owl.on('changed.owl.carousel', function(){
			timeoutID = setTimeout(function(){
				var centerImg = owl.find('.center').find('div');
				url = centerImg.css('background-image');
				bgDrop.css('background-image', url);
			},50); 	
		});
	}
// prev.owl.carousel & next.owl.carousel -Документация плагина
	prev.click(function(){
		owl.trigger('prev.owl.carousel');
	});
	next.click(function(){
		owl.trigger('next.owl.carousel');
	});
// делает обертку по высоте окна
	function getResize(){
		carouselKai.css({
				'height': $(window).innerHeight() + 'px'
			});
		$(window).on('resize', function(){
			carouselKai.css({
				'height': $(window).innerHeight() + 'px'
			});
		});
	}
// создает обертку и навигацию
	function createBodyKai(){
		var bgDrop = createEl('div'),
			controlsKai = createEl('div'),
			leftKai = createEl('div'),
			rigthKai = createEl('div');
		$(bgDrop).addClass('bg-drop');
		$(controlsKai).addClass('controls-kai');
		$(leftKai).addClass('arrow left');
		$(rigthKai).addClass('arrow right');

		$('.carousel-kai').append($(bgDrop));
		$('.carousel-kai').append($(controlsKai));
		$(controlsKai).append($(leftKai));
		$(controlsKai).append($(rigthKai));

		$('.controls-kai .left').wrapInner('<i class="icon-arrow-left"></i>');
		$('.controls-kai .right').wrapInner('<i class="icon-arrow-right"></i>');
	}

});


function createEl(el){
	return document.createElement(el)
}
