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
    scrollReveal: function() {
        window.sr = new ScrollReveal({
            vFactor: 0.3
        });

        //Default Scroll Reveals
        // sr.reveal('[data-sr]');
        sr.reveal('.flip-45', {
            rotate: {
                x: 45
            }
        });
        sr.reveal('.flip-45', {
            rotate: {
                x: 45
            }
        });



        //Portfolio Figures
        sr.reveal('#projects section:nth-child(even) figure.primary', {
            distance: '250px',
            origin: 'right',
            vFactor: 0.75
        });
        sr.reveal('#projects section:nth-child(odd) figure.primary', {
            distance: '250px',
            origin: 'left',
            vFactor: 0.75
        });

        //Logos on portfolio page
        sr.reveal('#professional-skills img', {
            rotate: {
                x: 45
            },
            viewFactor: 0.01,
            delay: 100
        })
;
        //For Hire Panels
        sr.reveal('.packages .sr-enter-right', {
            distance: '200px',
            origin: 'right',
            delay: 250
        });
        sr.reveal('.packages .sr-enter-left', {
            distance: '200px',
            origin: 'left',
            delay: 250
        });
        sr.reveal('.packages .sr-enter-bottom', {
            distance: '200px',
            origin: 'bottom'
        });

        //About page
        sr.reveal('#cd-timeline > section:nth-child(even)',{
            distance: '200px',
            origin: 'right'
        });

         sr.reveal('#cd-timeline > section:nth-child(odd)',{
            distance: '200px',
            origin: 'left'
        });

    },
    shuffle: function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
};