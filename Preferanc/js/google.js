$('document').ready(function () {
    function translate() {
        $('#google_translate_element').on("click", function () {
            $("iframe").css({
                'width': ($(".goog-te-menu2").width() + 'px')
            });
            $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
                .css({
                    'color': '#544F4B',
                    'font-family': 'Roboto',
                    'width': '100%'
                });
            $("iframe").contents().find('.goog-te-menu2-item-selected').css('display', 'none');
            $("iframe").contents().find('.goog-te-menu2').css({
                'padding': '0px',
                'border': 'none',
                'width': '100%',
                'height': 'auto'
            });
            $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');
            $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
            $("iframe").contents().find('td').css('width', '100%');
            $("iframe").contents().find(".goog-te-menu2-item div").hover(function () {
                $(this).css('background-color', '#111111').find('span.text').css('color', 'white');
            }, function () {
                $(this).css('background-color', 'white').find('span.text').css('color', '#544F4B');
            });
            $(".goog-te-menu-frame").css('box-shadow', '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)');
            $(".goog-te-menu-frame").css({
                'height': '100%',
                'width': '100%',
                'top': '0px'
            });
        });
    }
    translate();
});