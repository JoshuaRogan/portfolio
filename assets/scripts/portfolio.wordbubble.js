portfolio.wordbubble = {
	debug: true, 
	defaults: {
		fontweights: [300,400,700,900],
		fontsizes: [],
		numClasses: 10, 
	},
	//Weight words between 1-10
	skills_words: [
		{word: "LESS", weight: 8},
		{word: "SASS", weight: 8},
		{word: "PostCSS", weight: 8},
		{word: "Gulp", weight: 9},
		{word: "Grunt", weight: 9},
		{word: "Capistrano", weight: 8},
		{word: "Dev Tools", weight: 5},
		{word: "Modernizr", weight: 5},
		{word: "Google App Engine", weight: 6},
		{word: "Laravel", weight: 7},
		{word: "Responsive", weight: 4},
		{word: "Photoshop", weight: 6},
		{word: "Lightroom", weight: 6},
		{word: "Unix", weight: 7},
		{word: "Bash", weight: 7},
		{word: "Sublime", weight: 9},
		{word: "Bower", weight: 8},
		{word: "NPM", weight: 8},
		{word: "Jekyll", weight: 8},
		{word: "Flask", weight: 7},
		{word: "Cake PHP", weight: 5},
		{word: "Wordpress", weight: 5},
		{word: "Premiere Pro", weight: 5},
		{word: "Font Awesome", weight: 6},
		{word: "Bedrock", weight: 4},
		{word: "DRY", weight: 7},
		{word: "Functional", weight: 5},
		{word: "Atlassian", weight: 3},
		{word: "Git", weight: 8},
		{word: "Basecamp", weight: 7},
		{word: "Bootstrap", weight: 8},
		{word: "Foundation", weight: 7}
	],
	initSkillsWordBubble: function(selector){
		var element = $(selector); 
		if(element.length){
			var html = this.createWordBubble(this.skills_words, this.defaults.fontweights);
			$(element).html(html);
		}
		else{
			if(this.debug) console.log("Bad selector");
		}
		
	},
	createWordBubble: function(words, fontweights){
		//Create five classes based on the weights
		var html_data = words.map(function(obj, key) {
			obj.class = Math.floor(Math.random() * obj.weight / 2); 
			obj.weight = Math.floor(Math.random() * portfolio.wordbubble.defaults.fontweights.length); 
			return obj;
		});

		return this.generateWordHTML(portfolio.helpers.shuffle(html_data));
	},
	generateWordHTML: function(html_data){
		var html = "<p>";
		var sizeClass = "";
		var weightClass = "";
		$.each(html_data, function(index, data){
			sizeClass = "bubble-size-" + data.class; 
			weightClass = "weight-" + data.weight; 
			html += "<span class='word " + sizeClass + " " + weightClass + "'>";
			html += data.word; 
			html += "</span> ";
		});
		html += "</p>"; 

		return html;
	}
};