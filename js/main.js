(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);


document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const form = event.target;
            const submitBtn = document.getElementById('sendMessage');
            const feedbackDiv = document.getElementById('formFeedback');

            // Show loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;

            // Hide any previous feedback
            feedbackDiv.style.display = 'none';
            feedbackDiv.className = 'form-feedback';

            // Prepare form data
            const formData = new FormData(form);

            // Send to Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    feedbackDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                    feedbackDiv.classList.add('form-success');
                    feedbackDiv.style.display = 'block';
                    form.reset();
                } else {
                    // Error
                    feedbackDiv.textContent = 'Sorry, there was an error sending your message. Please try again later or contact us directly.';
                    feedbackDiv.classList.add('form-error');
                    feedbackDiv.style.display = 'block';
                }
            })
            .catch(error => {
                // Network error
                feedbackDiv.textContent = 'Network error. Please check your connection and try again.';
                feedbackDiv.classList.add('form-error');
                feedbackDiv.style.display = 'block';
            })
            .finally(() => {
                // Reset button state
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            });
        });

