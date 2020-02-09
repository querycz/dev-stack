$(document).ready(function() {

	// Swiper
	var mySwiper = new Swiper ('.swiper-container', {
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
