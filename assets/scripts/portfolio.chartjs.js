portfolio.chartjs = {
    debug: false,
    colors: ["#F0575B", "#2C3E50", "#47BA73", "#16B5D8", "#9b59b6", "#f39c12", "#95a5a6", "#e67e22", "#46BFBD"],
    colors_highlight: [],
    options: Chart.defaults.PolarArea, 
    webdata: [
        {value: 85, label: "HTML5"},
        {value: 90, label: "CSS3 + SASS + LESS"},
        {value: 85, label: "JavaScript"},
        {value: 90, label: "Gulp & Grunt"},
    ],
    appdata:[
        {value: 85, label: "PHP"},
        {value: 80, label: "Python"},
        {value: 75, label: "SQL"},
        {value: 80, label: "Java"},
        {value: 75, label: "Ruby"},
        {value: 85, label: "Javascript"},
    ],
    designdata: [
        {value: 80, label: "Photoshop"},
        {value: 60, label: "Premiere"},
        {value: 80, label: "dSLR Photography"},
        {value: 85, label: "Adobe Lightroom"},
        {value: 70, label: "Illustrator"},
        {value: 55, label: "After Effects"},
    ],
    /**
     * Initialize the skills charts 
     * 
     */
    initSkillsCharts: function() {
        this.defaults();
        this.initWebDev();
        this.initAppDev();
        this.initDesignDev();
    },
    defaults: function() {
        Chart.defaults.global.responsive = true;
        this.options.legendTemplate = "<ul class=\" list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"color:<%=segments[i].fillColor%>; font-weight:900\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";
        this.options.showScale = false;
    },
    initWebDev: function() {
        this.createSkillsChart(".detailed-skills #web-dev", this.webdata);
    },
    initAppDev: function(){
        this.createSkillsChart(".detailed-skills #application-dev", this.appdata);
    },
    initDesignDev: function(){
        this.createSkillsChart(".detailed-skills #design-dev", this.designdata);
    },
    createSkillsChart: function(selector, data){
        var element = $(selector);
        var ctx = element.get(0).getContext("2d");
        var final_data = data.map(function(obj, key){
            obj.color = portfolio.chartjs.colors[key];
            obj.highlight = portfolio.chartjs.colors_highlight[0];
            return obj;
        });
        var chart = new Chart(ctx).PolarArea(final_data, this.options);
        element.next().html(chart.generateLegend());
    }
};