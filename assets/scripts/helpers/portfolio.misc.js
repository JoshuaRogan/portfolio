portfolio.helpers = {
    debug: true,
    /**
     * Display only one quote in the jumbotron
     * 
     */
    displayquote: function() {
        var quotes = $('.jumbotron blockquote');
        var display = Math.floor(Math.random() * quotes.length);
        quotes.eq(display).addClass('show');
    },
    loadCSS: function(src) {
        if (document.createStyleSheet) {
            document.createStyleSheet(src);
        } else {
            $("head").append($("<link rel='stylesheet' href='" + src + "' type='text/css' media='screen' />"));
        }
    },
    /**
     * Setup Scroll reveal
     * @return {[type]} [description]
     */
    scrollReveal: function(){
        window.sr = new scrollReveal({
            vFactor: 0.3
        });

        //Init main > h1, main > section, etc., nav, footer > div
        //Remove all data-sr
        
         
    }
};