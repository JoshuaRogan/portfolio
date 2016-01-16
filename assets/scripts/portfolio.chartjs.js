portfolio.chartjs = {
    debug: false,
    oldColors: ["#F0575B", "#2C3E50", "#47BA73", "#16B5D8", "#9b59b6", "#f39c12", "#95a5a6", "#e67e22", "#46BFBD"],
    colors_highlight: [],
    polarOptions: Chart.defaults.PolarArea, 
    charts: [], //All of the charts
    webData: [
        {value: 85, label: "HTML5"},
        {value: 90, label: "CSS3 + SASS + LESS"},
        {value: 85, label: "JavaScript"},
        {value: 90, label: "Gulp & Grunt"},
    ],
    languagesData: [
        {value: 70, label: "Python"},
        {value: 85, label: "Javascript"},
        {value: 85, label: "PHP"},
        {value: 75, label: "SQL"},
        {value: 80, label: "Java"},
        {value: 60, label: "Ruby"},
    ],
    designData: [
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
        // this.createWebChart();
        this.createLanguagesChart();
    },
    oldDefaults: function() {
        Chart.defaults.global.responsive = true;
        this.options.legendTemplate = "<ul class=\" list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"color:<%=segments[i].fillColor%>; font-weight:900\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";
        this.options.showScale = false;
    },
    defaults: function(){
        Chart.defaults.global.responsive = true; 
        // Chart.defaults.global.pointLabelFontFamily
        Chart.defaults.global.scaleFontFamily = '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif"';

        //Custom Tooltip
        Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%><%}%>";
        Chart.defaults.global.tooltipFontFamily = '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif"';
        Chart.defaults.global.tooltipFillColor = '#2C3E50';
        Chart.defaults.global.tooltipFontStyle = 'Bold';
        Chart.defaults.global.tooltipCornerRadius = 0;

        //Polar Options
        this.polarOptions.legendTemplate = "<ul class=\" list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"color:<%=segments[i].fillColor%>; font-weight:900\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>";
        this.polarOptions.animationEasing = "easeOutElastic"; //Animated when scroll point hit
        this.polarOptions.animationSteps = 250;
        this.polarOptions.scaleShowLabels = false;
        this.polarOptions.responsive = true;
        //New Color Scheme
        
    },
    createLanguagesChart: function() {
        this.createPolarChart('#skill-developing #developing-languages #language-chart', this.languagesData);
    },
    createWebChart: function(){
        this.createPolarChart('#skill-developing #developing-web #web-chart', this.webData);
    },
    createRadarChart: function(selector, data){
        var element = $(selector);
        var ctx = element.get(0).getContext("2d");
        var chart = new Chart(ctx).Radar(data, this.polarOptions);
        this.charts.push(chart);
        element.next().html(chart.generateLegend());
    },
    createPolarChart: function(selector, data){
        var element = $(selector);
        var ctx = element.get(0).getContext("2d");
        var final_data = data.map(function(obj, key){
            obj.color = portfolio.chartjs.oldColors[key];
            obj.highlight = portfolio.chartjs.colors_highlight[0];
            return obj;
        });
        var chart = new Chart(ctx).PolarArea(final_data, this.options);
        this.charts.push(chart);
        element.next().html(chart.generateLegend());
    },
    resizeCharts: function(){
        $.each(this.charts, function(index, value){
            value.resize(); 
            value.render();
        });
    }
};