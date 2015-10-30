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
		var element = $(selector);
		if(selector.length){
			var quote = this.getQuote();
			element.find('.quote').html(quote.quote);
			element.attr('cite',quote.source);
		}
		else{
			if(this.debug) console.log("Bad selector");
		}
	},
	loadFooter: function(selector){

	}
};