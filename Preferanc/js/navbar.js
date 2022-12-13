/**
 * RESPONSIVE NAV JS
 * http://jsfiddle.net/csswizardry/ev598/
 * http://jsfiddle.net/shanomurphy/zp376/
 * =================
 */
$(function () {
    // "use strict";
    /* Add a class of 'js' to the HTML element */
    var root = document.documentElement;
    root.className = root.className + " js";
});

/* The target nav */
var responsiveNav = document.getElementById("js-tt-nav");

/* Insert <a> element for toggle button inside the <nav> element */
var toggleBtn = document.createElement("a");
toggleBtn.setAttribute("href", "#");
toggleBtn.setAttribute("class", "tt-nav__toggle");

$(".tt-nav__toggle").on("click touchstart", function (e) {
    $(this).parent().toggleClass("tt-nav--open");
    return false;
});

$(".tt-nav__link").on("click touchstart", function (e) {
    $(this).parent().toggleClass("is-active").siblings().removeClass("is-active");
    return false;
});

//bind the touchstart event to the link element
//http://stackoverflow.com/questions/13090285/touchstart-and-touchend-to-simulate-hover-or-mouseup-and-mousedown
$(".tt-nav__submenu a").on("click touchstart mouseover", function (e) {
    $(".tt-nav__submenu a").removeClass("is-selected");
    $(this).toggleClass("is-selected");
    // return false;
});

// here we set a class "itemcount-[number]" in order to calculate the height in Sass for the height (= padding-bottom) of the submenu
$(function () {
    var itms = {
        home: $("#tt-home li").length,
        forum: $("#tt-forum li").length,
        shop: $("#tt-shop li").length,
        gallery: $("#tt-gallery li").length,
        support: $("#tt-support li").length,
        feedback: $("#tt-feedback li").length
    };

    jQuery.each(itms, function (i, val) {
        $("#tt-" + i).addClass("tt-nav__itemcount-" + val);
    });
});

(function ($, window, document, undefined) {
    $.fn.doubleTapToGo = function (params) {
        if (
            !("ontouchstart" in window) &&
            !navigator.msMaxTouchPoints &&
            !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)
        )
            return false;

        this.each(function () {
            var curItem = false;

            $(this).on("click", function (e) {
                var item = $(this);
                if (item[0] != curItem[0]) {
                    e.preventDefault();
                    curItem = item;
                }
            });

            $(document).on("click touchstart MSPointerDown", function (e) {
                var resetItem = true,
                    parents = $(e.target).parents();

                for (var i = 0; i < parents.length; i++)
                    if (parents[i] == curItem[0]) resetItem = false;

                if (resetItem) curItem = false;
            });
        });
        return this;
    };
})(jQuery, window, document);

$(".tt-nav__submenu li").doubleTapToGo();