// Define text_index and lustra variables
 // Can range from 0 to 12
var lustra = "A,D"; // Comma-separated values: A, D, B, C, E, F

$('#lustra_sel').on('click', '.l_selector', function () {
    // Get the 'lustra_val' value from the clicked element
    const selectedLustra = $(this).attr('lustra_val');

    if (selectedLustra) {
        // Set the global lustra variable
        lustra = selectedLustra;
        console.log('Lustra set to:', lustra); 
		updateGallerySwiper();
		// Optional: for debugging purposes
    } else {
        console.warn('No "lustra_val" value found on the clicked element.');
    }
});

 var imageTitles = [
        ["A0", "B0", "B1", "B2", "B3", "C1", "C2", "D0", "E0", "E1", "E3", "F0", "F1"],
        ["A0", "A1", "A2", "B0", "B1", "B2", "B3", "B4", "B5", "D0", "D1", "D2", "E0", "E1", "E2", "F0", "F1"],
        ["A0", "A1", "A2", "A3", "B0", "B1", "B2", "B3", "B4", "B5", "C0", "C1", "D0", "D1", "D2", "D3", "E0", "E2", "F0", "F1", "F2", "F3"],
        ["A0", "A1", "B0", "B1", "B2", "B3", "B4", "B5", "C0", "C1", "D0", "D1", "E0", "E1", "E2", "E3", "F0", "F1", "F2"],
        ["A0", "A1", "A2", "A3", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "C0", "D0", "D1", "D2", "D3", "E0", "E1", "E2", "E3", "F0", "F1", "F2", "F3", "F4", "F5"],
        ["A0", "A1", "A2", "A3", "A4", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "C0", "C1", "C2", "D0", "D1", "D2", "D3", "D4", "E0", "E1", "E2", "F0", "F1", "F2", "F3", "F4"],
        ["A0", "A1", "A2", "A3", "A4", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "C0", "C1", "C2", "C3", "C4", "D0", "D1", "D2", "D3", "D4", "E0", "E1", "E2", "E3", "E4", "E5", "F0", "F1", "F2", "F3", "F4", "F5"],
        ["A0", "A1", "A2", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "C0", "D0", "D1", "D2", "E0", "E1", "E2", "F0", "F1", "F2"],
        ["A0", "A1", "A2", "A3", "B0", "B1", "B10", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C0", "C1", "C2", "C3", "C4", "D0", "D1", "D2", "D3", "E0", "E1", "E2", "E3", "E4", "E5", "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"],
        ["A0", "A1", "A2", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "C0", "C1", "D0", "D1", "D2", "E0", "E1", "E2", "E3", "F0", "F1", "F2", "F3"],
        ["A0", "A1", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "C0", "D0", "D1", "E0", "E1", "E2", "F0", "F1", "F2", "F3"],
        ["A1", "A10", "A2", "B10", "B11", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C1", "C10", "D1", "D10", "D2", "E0", "E1", "E2", "F1", "F10"],
        ["A0", "A1", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C0", "D0", "D1", "D2", "E0", "E1", "E2", "F0", "F1", "F2", "F3", "F4"]
    ];

// Function to update Swiper slides
function updateGallerySwiper() {
    const lustraValues = lustra.split(","); // Split lustra string into an array
    const currentImageTitles = imageTitles[text_index]; // Get the titles array for the current index

    // Group titles by lustra
    const groupedTitles = {};
    lustraValues.forEach(lustraLetter => {
        groupedTitles[lustraLetter] = currentImageTitles.filter(title => title.startsWith(lustraLetter));
    });

    // Interleave the grouped titles
    const maxLength = Math.max(...Object.values(groupedTitles).map(group => group.length));
    const interleavedTitles = [];
    for (let i = 0; i < maxLength; i++) {
        lustraValues.forEach(lustraLetter => {
            if (groupedTitles[lustraLetter][i]) {
                interleavedTitles.push(groupedTitles[lustraLetter][i]);
            }
        });
    }

    // Clear existing slides
    const swiperWrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
    swiperWrapper.innerHTML = '';

    // Add new slides
    interleavedTitles.forEach(title => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="swiper-zoom-container">
                <img src="./assets/img/IMG/${text_index}/${title}.webp" alt="${title}">
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
gallerySwiper.slideTo(0);
    // Reinitialize Swiper
    gallerySwiper.update();
}

// Initialize Swiper
const gallerySwiper = new Swiper('.gallery-swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    zoom: true,
    effect: 'fade',
	 fadeEffect: {
    crossFade: true
  },
});

// Initial load
updateGallerySwiper();











function replaceGalWithThumbnails() {
    // Define illustrator names
    const illustratorNames = {
        A: "J.Tenniel",
        D: "J.Tenniel",
        B: "R.Ingpen",
        C: "A.Racham",
        E: "Г.Калиновский",
        F: "Ю.Ващенко"
    };

    // Select all .gal elements within #text
    $('#text .gal').each(function (galIndex) {
        // Get the current chapter index
        const chapterIndex = text_index; // Current chapter

        // Get all image titles for the current chapter
        const chapterImages = imageTitles[chapterIndex];

        // Filter images based on the gal index (ignore exclusions)
        const filteredImages = chapterImages.filter((title) => {
            const imageIndex = title.slice(1); // Get the index (e.g., "0" from "A0")
            return imageIndex === galIndex.toString(); // Match the index with the .gal index
        });

        // Create a container for thumbnails
        let thumbnailsDiv = `<div class="thumb-container">`;

        // Add filtered images as thumbnails
        filteredImages.forEach((title) => {
            const illustratorCode = title.charAt(0); // The first character is the illustrator code
            const illustratorName = illustratorNames[illustratorCode] || "Unknown"; // Get illustrator name based on the code

            thumbnailsDiv += `
                <div class="thumb">
                    <img class="img-fluid" src="./assets/img/IMG/${chapterIndex}/${title}.webp" alt="${title}">
                    <span class="illustrator-name">${illustratorName}</span> <!-- Add illustrator name -->
                </div>`;
        });

        // Close the container div
        thumbnailsDiv += `</div>`;

        // Replace the current .gal with the new thumbnails container
        $(this).replaceWith(thumbnailsDiv);
    });

    THUMBER(); // Reapply the THUMBER function
}



function THUMBER() {
    // Function to change the image to the thumbnail source
   
  
$('.thumb').on('click', function () {
    console.log('touch'); // Log to confirm the click event

    // Get the thumbnail image source
    const thumbImgSrc = $(this).find('img').attr('src');

    // Update the active slide's image source
    const activeSlide = $('.gallery-swiper .swiper-slide.swiper-slide-active img');
    if (activeSlide.length && thumbImgSrc) {
        activeSlide.attr('src', thumbImgSrc); // Change the active slide image
        console.log('Updated active slide to:', thumbImgSrc); // Log the updated image source
    } else {
        console.log('No active slide or thumbnail source found.'); // Log an error message if something is missing
    }
});
        
    checkVisibleThumbContainersInCustomViewport(); 
}




















function isElementInCustomViewport(el, viewport) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= viewport.top &&
        rect.left >= viewport.left &&
        rect.bottom <= viewport.bottom &&
        rect.right <= viewport.right
    );
}




function checkVisibleThumbContainersInCustomViewport() {
    // Define the custom viewport: 100vh x 50vw sticked to the left
    const customViewport = {
        top: 0, // Top of the screen
        left: 0, // Left edge of the screen
        bottom: window.innerHeight, // Bottom of the screen
        right: window.innerWidth * 0.5, // 50% of the viewport width
    };

    // Split the lustra variable into an array of merged illustrators
    const mergedIllustrators = lustra.split(','); // Example: ["A", "D"]

    // Loop through all .thumb-container elements and check visibility
    $('.thumb-container').each(function (index) {
        const thumbContainer = $(this)[0]; // Get the DOM element

        if (isElementInCustomViewport(thumbContainer, customViewport)) {
            console.log(`Thumb-container indexed ${index} is visible in the custom viewport.`);

            // Find the first image in this container that matches the lustra variable
            const matchingImg = $(thumbContainer)
                .find('img')
                .filter(function () {
                    const alt = $(this).attr('alt'); // Get the alt attribute of the image
                    const illustrator = alt.charAt(0); // Extract the illustrator (e.g., "A" from "A0")
                    return mergedIllustrators.includes(illustrator); // Check if it's in the merged illustrators
                })
                .first(); // Get the first matching image

            if (matchingImg.length) {
                const targetAlt = matchingImg.attr('alt'); // Get the alt attribute (e.g., "A1")

                // Find the corresponding slide in gallerySwiper with the same alt value
                const targetSlideIndex = $('.gallery-swiper .swiper-slide img').index(
                    $(`.gallery-swiper .swiper-slide img[alt="${targetAlt}"]`)
                );

                if (targetSlideIndex !== -1) {
                    console.log(`Sliding to gallerySwiper slide index: ${targetSlideIndex}`);
                    gallerySwiper.slideTo(targetSlideIndex); // Slide to the target index
                }
            }
        }
    });
}
