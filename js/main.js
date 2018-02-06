$(document).ready(function($) {
	scrollToElement();
	paintTechnologies();
});

// скролл по клику на меню
function scrollToElement(){
	$('.kai-nav li a').click(function(){
		var target = $(this).attr('href'),
		posY = $(target).offset().top;
		$('html,body').animate({
			scrollTop: posY
		},1000, "linear");
	});
}

function paintTechnologies(){
	var r = 20,
		g = 20,
		b = 20;
	$('.technologies .col-md-3').each(function(i, el) {
		r+=10;
		g+=11;
		b+=12;
		$(el).css('background-color', 'rgb('+ r +','+ g +',' + b +')');

	});
}