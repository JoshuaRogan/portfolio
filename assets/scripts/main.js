/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
var portfolio = {
    debug: true
};
(function($) {
    portfolio.events = {
        // All pages
        'common': {
            init: function() {
                portfolio.helpers.loadPage();
            },
            finalize: function() {
                portfolio.helpers.scrollReveal();
            }
        },
        'home': {
            init: function() {},
            finalize: function() {}
        },
        'jumbo': {
            init: function() {
                portfolio.quotes.loadJumboTron('.jumbotron blockquote');
            },
            finalize: function() {}
        },
        'about': {
            init: function() {
                
            },
            finalize: function() {}
        },
        'portfolio':{
            init: function(){
                portfolio.wordbubble.initSkillsWordBubble('#wordbubble section');
                portfolio.chartjs.initSkillsCharts();
                portfolio.velocity.initPortfolioNavScroll();
            }, 
            finalize: function(){

            }
        }
    };
    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = portfolio.events;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';
            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            // Fire common init JS
            UTIL.fire('common');
            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });
            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        }
    };
    // Load Events
    $(document).ready(UTIL.loadEvents);
})(jQuery); // Fully reference jQuery after this point