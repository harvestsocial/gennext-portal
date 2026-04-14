/*-----------------------------------------------------------------------------------
    Template Name: Evator - Event & Conference HTML Template
    Template URI: https://webtend.net/demo/html/evator/
    Author: WebTend
    Author URI:  https://webtend.net/
    Version: 1.0

    Note: This is Main JS File.
-----------------------------------------------------------------------------------
	CSS INDEX
	===================
    ## Header Style
    ## Dropdown menu
    ## Submenu
    ## Main Slider
    ## Count Down
    ## Video Popup
    ## Client Logo
    ## Testimonials
    ## Get From Event
    ## Gallery Popup
    ## Project Gallery
    ## SkillBar
    ## Fact Counter
    ## Project Masonry
    ## Blog Masonry
    ## Features Masonry
    ## Testimonials LoadMore
    ## Testimonials Overlay
    ## Events Filter
    ## Hover Content
    ## Scroll to Top
    ## Nice Select
    ## AOS Animation
    ## Preloader
    
-----------------------------------------------------------------------------------*/

(function ($) {

    "use strict";

    $(document).ready(function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 250) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }
        headerStyle();
        
        
        // ## Dropdown menu
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');

        navcollapse.hover(function () {
            if ($(window).innerWidth() >= mobileWidth) {
                $(this).children('ul').stop(true, false, true).slideToggle(300);
                $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
            }
        });
        
        // ## Submenu Dropdown Toggle
        if ($('.main-header .navigation li.dropdown ul').length) {
            $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="far fa-angle-down"></span></div>');

            //Dropdown Button
            $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
                $(this).prev('ul').slideToggle(500);
                $(this).prev('.megamenu').slideToggle(800);
            });
            
            //Disable dropdown parent link
            $('.navigation li.dropdown > a').on('click', function (e) {
                e.preventDefault();
            });
        }
        
        //Submenu Dropdown Toggle
        if ($('.main-header .main-menu').length) {
            $('.main-header .main-menu .navbar-toggle').click(function () {
                $(this).prev().prev().next().next().children('li.dropdown').hide();
            });
        }
        
        
        // ## Main Slider Counter + Progress bar
        var autoplay = 5000;
        var swiper = new Swiper('.swiper-container', {
            watchSlidesProgress: true,
            autoplay: autoplay,
            loop: false,
            speed: 1000,
            onProgress: photos_change,
            onSlideChangeStart: photos_change,
            prevButton: '.arrow-left',
            nextButton: '.arrow-right',
            effect: 'fade', // Effect: "slide", "fade", "cube", "coverflow" or "flip"
        });
        var counter = $('.swiper-counter');
        var currentCount = $('<span class="count">1<span/>');
        counter.append(currentCount);

        function photos_change(swiper) {
            var index = swiper.activeIndex + 1,
                $current = $(".swiper-slide").eq(index),
                dur = 0.8;
            var prevCount = $('.count');
            currentCount = $('<span class="count next">' + index + '<span/>');
            currentCount.appendTo(counter);
            TweenLite.to(prevCount, dur, {
                y: -12,
                opacity: 0,
                onCompleteParams: [prevCount],
                onComplete: function (prevCount) {
                    prevCount.remove();
                },
                ease: Power2.fadeOut
            });
            TweenLite.fromTo(currentCount, dur, {
                y: 12,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                ease: Power2.fadeOut
            });

            // For progress bar
            var elem = document.getElementById("progress");
            var width = 0;
            var autoplayTime = autoplay / 100;
            var id = setInterval(frame, autoplayTime);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + '%';
                }
            }

        }

                
        // ## Count Down
        document.querySelectorAll('.count-down').forEach(function (countdownElement) {
            var date = countdownElement.getAttribute('data-date');

            const second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;

            let countDown = new Date(date).getTime();

            setInterval(function () {
                let now = new Date().getTime(),
                    distance = countDown - now;

                countdownElement.querySelector('.days').innerText = Math.floor(distance / day);
                countdownElement.querySelector('.hours').innerText = Math.floor((distance % day) / hour);
                countdownElement.querySelector('.minutes').innerText = Math.floor((distance % hour) / minute);
                countdownElement.querySelector('.seconds').innerText = Math.floor((distance % minute) / second);
            }, second);
        });
          
        
        // ## Video Popup
        if ($('.mfp-iframe.video-play').length) {
            $('.mfp-iframe.video-play').magnificPopup({
                type: 'video',
            });
        }

        // ## Video Popup With Text
        if ($('.mfp-iframe.video-play-text').length) {
            $('.mfp-iframe.video-play-text').magnificPopup({
                type: 'video',
            });
        }

        
        // ## Client Logo Carousel
        if ($('.client-logo-active').length) {
            $('.client-logo-active').slick({
                infinite: true,
                speed: 400,
                arrows: false,
                dots: false,
                focusOnSelect: true,
                autoplay: true,
                autoplaySpeed: 5000,
                slidesToShow: 7,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 5,
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                ]
            });
        }
        
 
        // ## Testimonials Carousel
        if ($('.testimonials-active').length) {
            $('.testimonials-active').slick({
                infinite: true,
                speed: 400,
                arrows: false,
                dots: true,
                focusOnSelect: true,
                autoplay: true,
                autoplaySpeed: 5000,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }

        
        // ## Get From Event Slider
        if ($('.get-from-event-slider').length) {
            $('.get-from-event-slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                speed: 400,
                arrows: false,
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
        
        
        // ## Gallery Popup
        $('.gallery a').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
            },
        });
        
        
        // ## Project Gallery
        $('.project-item.style-two .icon').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
            },
        });
        
        
        // ## SkillBar
        if ($('.skillbar').length) {
            $('.skillbar').appear(function () {
                $('.skillbar').skillBars({
                    from: 0,
                    speed: 4000,
                    interval: 100,
                });
            });
        }
        
        
         /* ## Fact Counter + Text Count - Our Success */
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {
                
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }

            }, {
                accY: 0
            });
        }
        
        
        // ## Project Masonry
        if ($('.project-masonry').length) {
            $(this).imagesLoaded(function () {
                $('.project-masonry').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
        
        
        // ## Blog Masonry
        if ($('.blog-masonry').length) {
            $(this).imagesLoaded(function () {
                $('.blog-masonry').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
        
        
        // ## Features Masonry
        if ($('.featues-masonry').length) {
            $(this).imagesLoaded(function () {
                $('.featues-masonry').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
        
        
        // ## Testimonials LoadMore
        if($('.testimonials-loadmore').length){
            $('.testimonials-loadmore').simpleLoadMore({
              item: '.loaditem',
              count: 6,
              itemsToLoad: 3,
              btnHTML: '<div class="col-12 text-center"><a href="#" class="theme-btn style-three testi-load-btn">Load More</a></div>'
            });
        }
        
        
        // ## Testimonials Overlay
        if ($('.testi-load-btn').length) {
            $(".testi-load-btn").on('click', function (e) {
                e.preventDefault();
                $(this).parents().removeClass('testimonials-overlay');
            });
        }
        
        
        // ## Events Filter
        $('.events-active').imagesLoaded(function () {
			var items = $('.events-active').isotope({
				itemSelector: '.item',
				percentPosition: true,
			});
			// items on button click
			$('.events-nav').on('click', 'li', function () {
				var filterValue = $(this).attr('data-filter');
				items.isotope({
					filter: filterValue
				});
			});
			// menu active class
			$('.events-nav li').on('click', function (event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});
		});
        
        
        // ## Hover Content
        $('.hover-content').hover(
            function(){
                $(this).find('.inner-content').slideDown();
            }, function() {
                $(this).find('.inner-content').slideUp();
            }
        );
        
        
        // ## Scroll to Top
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function () {
                var target = $(this).attr('data-target');
                // animate
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1000);

            });
        }
        
        
        // ## Nice Select
        $('select').niceSelect();
        
        
        // ## AOS Animation
        AOS.init();
        
 
    });
    
    
    /* ==========================================================================
       When document is resize, do
    ========================================================================== */

    $(window).on('resize', function () {
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');
        navcollapse.children('ul').hide();
        navcollapse.children('.megamenu').hide();

    });


    /* ==========================================================================
       When document is scroll, do
    ========================================================================== */

    $(window).on('scroll', function () {

        // Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });

    /* ==========================================================================
       When document is loaded, do
    ========================================================================== */

    $(window).on('load', function () {

        
        // ## AOS Animation
        AOS.init();
        
        
        // ## Preloader
        function preloader() {
            const preloader = $('#preloader');
            preloader.find('.animation-preloader').fadeOut('slow');

            if (preloader.length > 0) {
                $('.preloader-layer .overly').animate({
                    'left': '100%'
                }, {
                    step: function (now, fx) {
                        $(this).css({"transform": "translate3d(0px, 0px, 0px)"});
                    },
                    duration: 650,
                    easing: 'linear',
                    queue: false,
                    complete: function () {
                        preloader.fadeOut('slow');
                    }
                }, 'linear');
            }
        }
        preloader();
        
    });

})(window.jQuery);
