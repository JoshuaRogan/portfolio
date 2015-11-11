portfolio.quotes = {
	debug: true, 
	quotes: [
		{quote: "I see now that the circumstances of one's birth are irrelevant. It is what you do with the gift of life that determines who you are.", source: "MewTwo", rating: 3, url: null},
		{quote: "The more you know, the more you know you don't know.", source: "Aristotle", rating: 5, url: null}
	],
	getQuote: function(){
		return this.quotes[Math.floor(Math.random() * (this.quotes.length - 0) + 0) ];
	},
	loadJumboTron: function(selector){
		if(selector.length){
			console.log(selector);
			var element = $(selector);
			var quote = this.getQuote();
			quote.quote = "&#8220;" + quote.quote + "&#8221;";
			element.find('.quote').html(quote.quote);
			element.attr('cite',quote.source);
			// this.enableTypedQuote(selector, quote.quote, quote.source); 
		}
		else{
			if(this.debug) console.log("Bad selector");
		}
	},
	loadFooter: function(selector){

	},
	enableTypedQuote: function(selector, quote, source){
		if(selector.length){
			var quote_element = $(selector).find('.quote'); 
			quote_element.typed({
            	strings: [quote + "<cite> - " + source + "</cite>"],
    			contentType: 'html' // or 'text'
        	});
		}
		else{
			if(this.debug) console.log("Bad selector");
		}
		
	}
};