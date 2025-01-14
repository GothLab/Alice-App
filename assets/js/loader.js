  particlesJS.load('particles-js', './assets/js/js/core/particles.json', function() {
      console.log('Particles.js config loaded!');
    });

$('#read').on('click',function(){
	$('#intro').fadeOut('slow');
})

function next() {
$('#nxt').on('click', function () {
    textSwiper.slideNext(); // Moves to the next slide
});
};

$('#settings_select').on('click',function(){
	
	//$('#intro').fadeIn('slow');
	
})