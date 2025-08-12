$(document).ready(function() {
    let currentImageIndex = 0;
    const images = $('.thumbnail');
    const totalImages = images.length;
    const modal = $('#imageModal');
    
    function openModal(index) {
        currentImageIndex = index;
        const imgSrc = $(images[index]).data('full');
        $('#modalImage').attr('src', imgSrc);
        modal.fadeIn(300);
        updateNavigationButtons();
    }
    
    function closeModal() {
        modal.fadeOut(300);
    }
    
    images.on('click', function() {
        openModal($(this).index());
    });
    
    $(document).on('click', '.close-btn', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeModal();
    });
    
    modal.on('click', function(e) {
        if ($(e.target).is(modal)) {
            closeModal();
        }
    });
    
    $('#prevBtn').on('click', function(e) {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            openModal(currentImageIndex - 1);
        }
    });
    
    $('#nextBtn').on('click', function(e) {
        e.stopPropagation();
        if (currentImageIndex < totalImages - 1) {
            openModal(currentImageIndex + 1);
        }
    });
    
    $(document).on('keydown', function(e) {
        if (e.key === "Escape" && modal.is(':visible')) {
            closeModal();
        }
    });
    
    function updateNavigationButtons() {
        $('#prevBtn').prop('disabled', currentImageIndex === 0);
        $('#nextBtn').prop('disabled', currentImageIndex === totalImages - 1);
    }
});