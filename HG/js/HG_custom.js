$(function() {
    // fulpage plugin
    $('#HG').fullpage({
        // 參數設定
        navigation: true, // 顯示導行列
        navigationPosition: "right", // 導行列位置
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'],
        autoScrolling: true,
        // lockAnchors: true,
        responsiveWidth: 596,
        menu: '#menu',
        afterResponsive: function(isResponsive) {
            if (isResponsive) {
                document.documentElement.classList.add('force-scroll')
            } else {
                document.documentElement.classList.remove('force-scroll')
            }
        }
    });

    // change header
    // logo change when scroll
    $(window).on('scroll', function() {
        var scrollDistance = $(window).scrollTop();
        var $header = $(".js-header");
        if (scrollDistance > 80) {
            $header.addClass("header--scrolling");
        } else {
            $header.removeClass("header--scrolling");
        }
    })



    // dialog plugin
    let openDialog = function(button, dialog) {
        $(button).on("click", function() {
            $(dialog).dialog("open");
        });
        $(dialog).dialog({
            create: function(event, ui) {
                console.log('open');
                $("body").css({
                    overflow: 'hidden'
                })
            },
            close: function(event, ui) {
                $("body").css({
                    overflow: 'inherit'
                })
            },
            autoOpen: false,
            draggable: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "drop",
                duration: 300,
                direction: "down"
            },
            resizable: true,
            height: $(window).height() * 0.8,
            width: $(window).width() * 0.8,
            modal: true
        });
    };

    openDialog('#status', '#dia_status');
    openDialog('#status2', '#dia_status');
    openDialog('#obe', '#dia_obe');
    openDialog('#obe2', '#dia_status');
});