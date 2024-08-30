$(document).ready(function() {
    "use strict";

    // Initial setup
    setTimeout(function() {
        $('.page-loader-wrapper').fadeOut();
    }, 50);

    // Tooltips and popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({ html: true });

    // Card actions
    const DIV_CARD = 'div.card';
    $('[data-toggle="card-remove"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);
        $card.remove();
        e.preventDefault();
        return false;
    });

    $('[data-toggle="card-collapse"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);
        $card.toggleClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    $('[data-toggle="card-fullscreen"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);
        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    // Sparkline charts
    if ($('[data-sparkline]').length) {
        var generateSparkline = function($elem, data, params) {
            $elem.sparkline(data, {
                type: $elem.attr('data-sparkline-type'),
                height: '100%',
                barColor: params.color,
                lineColor: params.color,
                fillColor: 'transparent',
                spotColor: params.color,
                spotRadius: 0,
                lineWidth: 2,
                highlightColor: hexToRgba(params.color, .6),
                highlightLineColor: '#666',
                defaultPixelsPerValue: 5
            });
        };
        require(['sparkline'], function() {
            $('[data-sparkline]').each(function() {
                var $chart = $(this);
                generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), { color: $chart.attr('data-sparkline-color') });
            });
        });
    }

    // Circle progress
    if ($('.chart-circle').length) {
        $('.chart-circle').each(function() {
            var $this = $(this);
            $this.circleProgress({
                fill: { color: 'indigo' },
                size: $this.height(),
                startAngle: -Math.PI / 4 * 2,
                emptyFill: '#F4F4F4',
                lineCap: 'round'
            });
        });
    }

    // Accordion
    $(".accordion2 > .accordion-item.is-active").children(".accordion-panel").slideDown();
    $(".accordion2 > .accordion-item").on('click', function() {
        $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
        $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
    });

    // Sparkline bars
    $('.bh_income').sparkline('html', {
        type: 'bar',
        height: '30px',
        barColor: '#1A5089',
        barWidth: 5
    });

    $('.bh_traffic').sparkline('html', {
        type: 'bar',
        height: '30px',
        barColor: '#E21E32',
        barWidth: 5
    });

    // Star rating toggle
    $('.star').on('click', function() {
        $(this).toggleClass('star-checked');
    });

    // Checkbox selection
    $('.ckbox label').on('click', function() {
        $(this).parents('tr').toggleClass('selected');
    });

    // Filter table rows
    $('.btn-filter').on('click', function() {
        var $target = $(this).data('target');
        if ($target !== 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

    // Sidebar and menu toggles
    $('.sidebar-nav').metisMenu();
    $('.menu_toggle').on('click', function() {
        $('body').toggleClass('offcanvas-active');
    });

    $('.chat_list_btn').on('click', function() {
        $('.chat_list').toggleClass('open');
    });

    $('.menu_option').on('click', function() {
        $('.metismenu').toggleClass('grid');
        $('.menu_option').toggleClass('active');
    });

    $('.user_btn').on('click', function() {
        $('.user_div').toggleClass('open');
    });

    $('a.settingbar').on('click', function() {
        $('.right_sidebar').toggleClass('open');
    });

    $('a.theme_btn').on('click', function() {
        $('.theme_div').toggleClass('open');
    });

    $('.page').on('click', function() {
        $('.theme_div, .right_sidebar').removeClass('open');
        $('.user_div').removeClass('open');
    });

    // Theme switch
    $('.theme_switch').on('click', function() {
        $('body').toggleClass('theme-dark');
    });

    // Settings switch
    $(".setting_switch .btn-darkmode").on('change', function() {
        if (this.checked) {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
    });

    $(".setting_switch .btn-fixnavbar").on('change', function() {
        if (this.checked) {
            $('#page_top').addClass('sticky-top');
        } else {
            $('#page_top').removeClass('sticky-top');
        }
    });

    $(".setting_switch .btn-iconcolor").on('change', function() {
        if (this.checked) {
            $('body').addClass('iconcolor');
        } else {
            $('body').removeClass('iconcolor');
        }
    });

    $(".setting_switch .btn-gradient").on('change', function() {
        if (this.checked) {
            $('body').addClass('gradient');
        } else {
            $('body').removeClass('gradient');
        }
    });

    $(".setting_switch .btn-sidebar").on('change', function() {
        if (this.checked) {
            $('body').addClass('sidebar_dark');
        } else {
            $('body').removeClass('sidebar_dark');
        }
    });

    $(".setting_switch .btn-min_sidebar").on('change', function() {
        if (this.checked) {
            $('#header_top').addClass('dark');
        } else {
            $('#header_top').removeClass('dark');
        }
    });

    $(".setting_switch .btn-pageheader").on('change', function() {
        if (this.checked) {
            $('#page_top').addClass('top_dark');
        } else {
            $('#page_top').removeClass('top_dark');
        }
    });

    $(".setting_switch .btn-boxshadow").on('change', function() {
        if (this.checked) {
            $('.card, .btn, .progress').addClass('box_shadow');
        } else {
            $('.card, .btn, .progress').removeClass('box_shadow');
        }
    });

    $(".setting_switch .btn-rtl").on('change', function() {
        if (this.checked) {
            $('body').addClass('rtl');
        } else {
            $('body').removeClass('rtl');
        }
    });

    $(".setting_switch .btn-boxlayout").on('change', function() {
        if (this.checked) {
            $('body').addClass('boxlayout');
        } else {
            $('body').removeClass('boxlayout');
        }
    });

    // User list
    var options = { valueNames: ['name', 'born'] };
    var userList = new List('users', options);

    // Theme stylesheet
    function setStyleSheet(url) {
        var stylesheet = document.getElementById("theme_stylesheet");
        stylesheet.setAttribute('href', url);
    }

    // Window resize
    $(window).bind("resize", function() {
        console.log($(this).width());
        if ($(this).width() < 1201) {
            $('.horizontal').removeClass('h_menu');
        } else {
            $('.horizontal').addClass('h_menu');
        }
    }).trigger('resize');

    // Color definitions
    window.anchor = {
        colors: {
            'theme1-one': '#6435c9',
            'theme1-two': '#f66d9b',
            'blue': '#467fcf',
            // ... (other color definitions)
            'gray-900': '#1C1D1E',
        }
    };
});
