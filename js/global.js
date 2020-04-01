$(document).ready(function() {

	// Hamburger
	$('.hamburger').click(function(e) {
		$('.nav-mobile').slideToggle(500);
		$(this).toggleClass('is-active');
		e.preventDefault();
	});



	// Init Waves
	Waves.attach('.button', ['waves-light']);
	Waves.init();



	// SmoothScroll
	var scroll = new SmoothScroll('[data-scroll]');



	// Single Page Nav
	// $('.nav').singlePageNav({
	// 	speed: 750,
	// 	easing: 'swing',
	// 	updateHash: true,
	// 	// filter: ':not(.item-not-scroll .nav-link)',
	// 	// currentClass: 'nav-link-is-active',
	// 	offset: 0,
	// 	threshold: 50
	// });



	// Fancybox
	$("[data-fancybox]").fancybox({
		// hash: true,
		focus: false
	});



	// Add title to the pictures acording to ther caption content
	$('.gallery-item').each(function() {
		var link = $(this).find('a');
		var caption = $(this).find('.gallery-caption');
		link.attr('data-caption', caption.text());
	});



	// CF7 Events
	// document.addEventListener( 'wpcf7mailsent', function( event ) {
	// 	if ( '952' == event.detail.contactFormId ) {
	// 		location = '/uspesne-odeslano/';

	// 		// setTimeout( function() {
	// 		// 	$.fancybox.close();
	// 		// }, 3000);
	// 	}
	// }, false );



	// CF7 Floating Labels
	$(".has-floating-label input, .has-floating-label textarea").focus(function() {
		$(this).parent().siblings('label').addClass('has-value');
	}).blur(function() {
		var text_val = $(this).val();
		if (text_val === "") {
			$(this).parent().siblings('label').removeClass('has-value');
		}
	});





});
