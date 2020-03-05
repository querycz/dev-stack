$(document).ready(function() {

	// Hero Swiper
	var mySwiper = new Swiper ('.hero-swiper-container', {
		autoplay: {
			delay: 5000,
		},
		speed: 800,
		pagination: {
			el: '.home-swiper-pagination',
			clickable: true
		},
	})
});
