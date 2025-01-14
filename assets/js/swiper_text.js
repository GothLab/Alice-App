
var text_index = 0;
var author = 'S';

$('#trans_sel').on('click', '.a_selector', function () {
    // Get the 'author' value from the clicked element
    const selectedAuthor = $(this).attr('author');
    if (selectedAuthor) {
        // Set the global author variable
        author = selectedAuthor;
        console.log('Author set to:', author); // Optional: for debugging purposes
		updateTextSwiper();

    } else {
        console.warn('No "author" value found on the clicked element.');
    }
});




const textSwiper = new Swiper('.text-swiper', {
    direction: 'horizontal', // Horizontal scrolling
    slidesPerView: 1, // Dynamic sizing of slides
    loop: false,
    on: {
        init: function () {
            // Load initial content into the swiper
            updateTextSwiper();
			next();
        }
    }
});


textSwiper.on('slideChangeTransitionEnd', function () {
    console.log('Slide transition ended.');
    checkVisibleThumbContainersInCustomViewport(); // Check after slide transition ends
});

function updateTextSwiper() {
    // Ensure text_index is within bounds
    if (text_index < 0) text_index = 0;
    if (text_index > 12) text_index = 12;

    // Define the path dynamically based on `text_index` and `author`
    const filePath = `./${author}/${author}-${text_index}.html #text`;

    // Clear all slides
    $('.text-swiper .swiper-wrapper').empty();

    // Load content into the first slide
    const firstSlide = $('<div class="swiper-slide"></div>');
    $('.text-swiper .swiper-wrapper').append(firstSlide);




	
    firstSlide.load(filePath, function () {
        // Once content is loaded, calculate dimensions
        $('#text').removeClass('container'); // Optional styling change
		replaceGalWithThumbnails();
		
    // Select all <h1> elements inside #text and remove inline font-size
    $('#text h1').each(function() {
        $(this).css('font-size', '');  // Remove the inline font-size style
    });
		
	  const textEndElements = $('#text .text-end');

    // If there are any .text-end elements, replace them with an image
    if (textEndElements.length > 0) {
        textEndElements.each(function () {
            // Replace the current .text-end element with an image
            $(this).replaceWith('<img class="nuller" src="./assets/img/null.png" alt="null">');
        });
    } else {
        // If no .text-end elements, append the image with class "nuller" at the end of #text
        $('#text').append('<img class="nuller" src="./assets/img/null.png" alt="null">');
    }
		
		
        textSwiper.update();
	
        const content = firstSlide.find('#text');
        const contentHeight = content[0].scrollHeight; // Full content height
        const slideHeight = firstSlide.outerHeight();

        // Calculate the number of vertical slides needed
        var numVerticalSlides = Math.ceil(contentHeight / slideHeight);
		numVerticalSlides = numVerticalSlides +1;
        // Add additional slides if required
        if (numVerticalSlides > 1) {
            let newSlides = '';
            for (let i = 1; i < numVerticalSlides; i++) {
                newSlides += `<div class="swiper-slide"></div>`;
            }
            $('.text-swiper .swiper-wrapper').append(newSlides);
        }

		function activateCustomLinkHandler() {
    $('#text a').on('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        const hrefText = $(this).attr('href'); // Get the href attribute's value
        $('#texter').text(hrefText); // Set the text of #texter to the href value
        $('.toast').toast('show'); // Show the toast
    });

 
}

// Call the function when you need to activate the handler
activateCustomLinkHandler();

		
		
        // Update Swiper after adding slides
        textSwiper.update();
    });
}