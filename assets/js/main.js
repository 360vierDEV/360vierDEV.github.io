(function($) {
    console.log('%c © 360VIER GmbH ', 'color: #fff; background-color: #81ba49;');

    function initAnkernav() {
        $(document).ready(function() {
            const point = $('.ankerpoint');
            const nav = $('#ankernav');

            point.each(function() {
                var eName = $(this).data('name');
                var eID = $(this).attr('id');
                nav.find('ul').append('<li><a href="#' + eID + '">' + eName + '</a></li>');
            });

            $(document).on('click', '#ankernav a[href*="#"]', function() {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var targetOffset = -200;
                    var target = $(this.hash);
                    var scrollTop = $(window).scrollTop();
                    target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
                    if (target.length) {
                        var target_pos = target.offset().top;
                        $('html,body').animate({scrollTop: target_pos + targetOffset}, Math.abs(target_pos - scrollTop) / 4);
                        return false
                    }
                }
            })

            nav.waypoint({
                handler: function(direction) {
                    if(direction === 'down') {
                        nav.addClass('fixed');
                    }
                    else {
                        nav.removeClass('fixed');
                    }
                },
                offset: '80'
            });
        });

        $(window).on('scroll', ankerScroll);

        function ankerScroll() {
            var scrolled = $(window).scrollTop();
            var point = $('.ankerpoint');

            point.each(function(index) {
                var element = $(this);
                var eID = element.attr('id');
                var eTop = element.offset().top;

                if(index !== point.length - 1 && point.eq(index + 1).offset().top <= (scrolled + 200)) {
                    $('[href="#'+eID+'"]').removeClass('active');
                } else {
                    if (eTop <= (scrolled + 200)) {
                        $('[href="#' + eID + '"]').addClass('active');
                    } else {
                        $('[href="#' + eID + '"]').removeClass('active');
                    }
                }
            });
        }
    }

    initAnkernav();
})(jQuery);