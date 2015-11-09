portfolio.velocity = {
    debug: true,
    defaults: {},
    initPortfolioNavScroll: function() {
        $('.simple-nav li a').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var target = $(this).attr("href");
            $(target).velocity("scroll", {
                duration: 1000,
                offset: -40,
                easing: "ease-in-out"
            });
        });
    }
};