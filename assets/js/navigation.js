$('#next').on('click', function () {
    // Increment only if text_index is less than 12
    if (text_index < 12) {
        text_index++;
    }
	    updateTextSwiper();

    updateGallerySwiper();
});

$('#prev').on('click', function () {
    // Decrement only if text_index is greater than 0
    if (text_index > 0) {
        text_index--;
    }
	
	    updateTextSwiper();

    updateGallerySwiper();
});
