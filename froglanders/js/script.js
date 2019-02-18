    
    navigator.sayswho= (function(){
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\bOPR\/(\d+)/)
            if(tem!= null) return 'Opera '+tem[1];
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();


$('.carousel').carousel({
  interval: 4000
})

$('.btn-menu').click(function() {
    $('#select-nav').click();
    return false;
});

$('#select-nav').change(function() {
    if ($(this).val().charAt(0)!=="#") {
        location.href = $(this).val();
    } else {
        location.hash = $(this).val();
    }
});

$(".mobile-nav").each(function () { }).hide();
$('.btn-menu').click(function () {
	$('.mobile-nav').slideToggle();
});

$(window).load(function() {
    $("body").removeClass("preload");
});


 var device = Detect();
    if (device=='smartphone') {
        $('body').addClass('mobile');
    }

    if (device=='desktop') {
        $('body').addClass('computer');
    }

    

var sliderProgress = function() {
    var progress = $('#custom-slider .progressbar span');
    progress.css('width','0%');
    progress.animate({width: '100%'},8000, 'linear', function() {
        progress.fadeOut(function() {
            progress.css('width','0%');
            progress.show();
            sliderNext();
        });
    });
}

var sliderNext = function() {
    var first = $('#custom-slider > ul > li:first');
    var second = first.next();
    second.fadeIn(500, function() {
        first.hide();
        $('#custom-slider > ul').append(first);
        sliderProgress();
    });
}

var sliderPrev = function() {
    var last = $('#custom-slider > ul > li:last');
    var second =  $('#custom-slider > ul > li:first');
    $('#custom-slider > ul').prepend(last);
    last.show();
    second.fadeOut(500, function() {
        sliderProgress();
    });
}

$(window).resize(function() {
	$('#custom-slider').css('height',$(window).height()-50);
});
$('#custom-slider').css('height',$(window).height()-50);

$(window).resize(function() {
    $('#nous-joindre').css('min-height',$(window).height()-85);
});
$('#nous-joindre').css('min-height',$(window).height()-85);


$('#custom-slider').on('click','.next',function() {
    $('#custom-slider .progressbar span').stop( true, false );
    sliderNext();
    return false;
});

$('#custom-slider').on('click','.prev',function() {
    $('#custom-slider .progressbar span').stop( true, false );
    sliderPrev();
    return false;
});

sliderProgress();




    $(window).scroll(function(event) {
         if ($(window).scrollTop()>=150) $('.wrapper-nav').addClass('animated bounce active');
         else $('.wrapper-nav').removeClass('animated bounce active');
     });


    $(window).scroll(function(event) {
         if ($(window).scrollTop()>=450) $('.wrapper-cuisine').addClass('animated');
         else $('.wrapper-cuisine').removeClass('animated');
     });


    $('.menu-accordion').click(function() {
        $(this).toggleClass('active');
        
        var next = $(this).next();
        next.stop().slideToggle( "slow");
        if (!$(this).hasClass('active')) {
            next.find('.subaccordion.active').each(function() {
                if ($(this).hasClass('active')) {
                    $(this).toggleClass('active');
                    $(this).next().strop().slideToggle();
                }
            });

        }else{
            $('html, body').animate({
                scrollTop:$(this).offset().top - 60
            }, 600);
        }
        return false;
    });


    /* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}


$(".scrollto").click(function() { 
        var scrolltarget = $(this).attr('href');
        var li = $(this).parent().parent().find('li');
        var toposition = li.index($(this).parent());

        var fromposition = li.index($(this).parent().parent().find('li.active'));
        var nbrposition = parseInt(fromposition)-parseInt(toposition);
        if (nbrposition<0) nbrposition = nbrposition*-1;

         $('html, body').animate({
            scrollTop:$(scrolltarget).offset().top
        }, nbrposition*700);
        
        return false;
    });


var scrollToElement = function(element){
        if($(window).scrollTop()>$(element).position().top-100){
            return true;
        }else{
            return false;
        }
    };

    var checkElement = function(){
        if(scrollToElement($('#accueil'))){
            $('nav li').removeClass('active');
        }
        if(scrollToElement($('#about'))){
            $('nav li').removeClass('active');
            $('.bt-about').parent().addClass('active');
        }
        if(scrollToElement($('#menu'))){
            $('nav li').removeClass('active');
            $('.bt-menu').parent().addClass('active');
        }
        if(scrollToElement($('#photos'))){
            $('nav li').removeClass('active');
            $('.bt-photos').parent().addClass('active');
        }
        if(scrollToElement($('#nous-joindre'))){
            $('nav li').removeClass('active');
            $('.bt-nousjoindre').parent().addClass('active');
        }
        
    };
    $(window).scroll(function(){
        checkElement();
    });

    paceOptions = {
        startOnPageLoad : false,
      // Disable the 'elements' source
      elements: false,

      // Only show the progress on regular and ajax-y page navigation,
      // not every request
      restartOnRequestAfter: false
    }

