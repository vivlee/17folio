jQuery( document ).ready(function( $ ) {

	"use strict";

    
        // Mobile Navigation
        function mobileHeader() {
            var navigationToggle = $('.mobile-header .mobile-menu-toggle'),
                navToggleLink = navigationToggle.find('a'),
                mobileNav = $('.mobile-header .mobile-navigation'),
                dropToggle = $(".mobile-navigation .expander, .mobile-navigation a[href*='#']"),
                animTime = 200;


            if(navigationToggle.length && mobileNav.length) {
                navigationToggle.on('tap click', function(e) {
                    e.preventDefault();

                    if(mobileNav.is(':visible')) {
                        mobileNav.slideUp(animTime);
                    } else {
                        mobileNav.slideDown(animTime);
                    }
                });
            }

            if(dropToggle.length) {
                dropToggle.each(function() {
                    $(this).on('tap click', function(e) {
                        var dropToggleOpen = $(this).nextAll('ul').first();

                        if(dropToggleOpen.length) {
                            e.preventDefault();

                            var dropParent = $(this).parent('li');

                            if(dropToggleOpen.is(':visible')) {
                                dropToggleOpen.slideUp(animTime);
                                dropParent.removeClass('dropdown-open');
                            } else {
                                dropToggleOpen.slideDown(animTime);
                                dropParent.addClass('dropdown-open');
                            }

                        }

                    });
                });
            }

            navToggleLink.on('tap click', function(e) {
                mobileNav.slideUp(animTime);
            });
        }

        mobileHeader();

        if ($('#back-to-top').length) {
        var scrollTrigger = 500, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
        }

        $('#toggle').click(function() {
           $(this).toggleClass('active');
           $('#overlay').toggleClass('open');
        });

        $('#menu-toggle').click(function(){
            $(this).toggleClass('open');
        });
        //Exelent little functions to use any time when class modification is needed
        function hasClass(ele, cls) {
            return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(ele, cls) {
            if (!hasClass(ele, cls)) ele.className += " " + cls;
        }

        function removeClass(ele, cls) {
            if (hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }

        //Add event from js the keep the marup clean
        function init() {
            document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
        }

        //The actual fuction
        function toggleMenu() {
            var ele = document.getElementsByTagName('body')[0];
            if (!hasClass(ele, "open")) {
                addClass(ele, "open");
            } else {
                removeClass(ele, "open");
            }
        }

        //Prevent the function to run before the document is loaded
        document.addEventListener('readystatechange', function() {
            if (document.readyState === "complete") {
                init();
            }
        });

        $('.blog-slider').flexslider({
            animation: "slide",
            controlsContainer: $(".custom-controls-container"),
            customDirectionNav: $(".custom-navigation a")
        });


        $('#container').isotope({ filter: '.element' });

        // cache container
        var $container = $('#container');
        // initialize isotope
        $container.isotope({
        // options...
        });

        // filter items when filter link is clicked
        $('#filters a').click(function(){
          var selector = $(this).attr('data-filter');
          $container.isotope({ filter: selector });
          return false;
        });


	    // Projects Carousel
		var owl = $("#owl-projects");
    	  	owl.owlCarousel({
      		navigation : true,
    		navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      		pagination : true,
    		paginationNumbers: false,
      		autoPlay: false, //Set AutoPlay to 3 seconds
    	    items : 4, //10 items above 1000px browser width
    	    itemsDesktop : [1000,4], //5 items between 1000px and 901px
    	    itemsDesktopSmall : [900,2], // betweem 900px and 601px
    	    itemsTablet: [600,1], //2 items between 600 and 0
    	    itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
	    });

       // Projects Masonry
        var projectsIsotope=function(){
        var imgLoad = imagesLoaded($('.projects-isotope'));
   
        imgLoad.on('done',function(){

            $('.projects-isotope').isotope({
                "itemSelector": ".project-item",
            });
           
        })
       
       imgLoad.on('fail',function(){

            $('.projects-isotope').isotope({
                "itemSelector": ".project-item",
            });

       })  
       
    }
           
    projectsIsotope();



    // Accordion faqs
    function close_accordion_section() {
      $('.accordion .accordion-section-title').removeClass('active');
      $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.accordion-section-title').on('click', function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });

});