$(document).ready(function(){
    $(".slider").slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
    
    });
    
    
    
    var percentTime;
    var tick;
    var time = .1;
    var progressBarIndex = 0;
    
    
    
    $('.slider-wrapper .progressBar').each(function (index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });
    
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 15);
    }
    function interval() {
        if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
            $('.item').siblings().removeClass("active")
            startProgressbar();
        } else {
            percentTime += 1 / (time + 3.5);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            $('.item').eq(progressBarIndex).addClass("active")
            if (percentTime >= 100) {
                $('.single-item').slick('slickNext');
                progressBarIndex++;
                $('.item').siblings().removeClass("active")
                if (progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
    }
    
    function resetProgressbar() {
        
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();
    
    $(".item").click(function () {
        $(this).siblings().removeClass("active");
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        clearInterval(tick);
        startProgressbar();
    });
    
    $(".screen-slider").slick({
        infinite:true,
        arrows: false,
        dots: false,
        // autoplay: true,
        // autoplaySpeed: 5000,
        // speed: 700,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '100px',
        variableWidth: true,
        adaptiveHeight: true,
    });

    $('.btn').on('mouseenter', function(e) {
        var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
        $(this).find('span').css({top:relY, left:relX})
      }).on('mouseout', function(e) {
        var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
        $(this).find('span').css({top:relY, left:relX})
      });
});

