// Cedar (D3/Vega) Plot
function getScatterplot (data) {
    
    var chart = new Cedar({
        "type": "scatter",
        "tooltip": {
            "title": "{SurveyYear}",
            "content": "{Mean}"
        },
        "dataset": {
            "data": data,
            "mappings": {
                "x": {
                    "field": "SurveyYear",
                    "label": "Survey Year"
                },
                "y": {
                    "field": "Mean",
                    "label": "Count per area (mean)"
                },
                "color": {
                    "field": "SurveyYear",
                    "label": "Survey Year"
                }
            }
        }
    });
    chart.show({
        elementId: "#chart",
        height: 300
    });
    
}

// Highcharts Plot
function getHCScatterplot (data) {
    var xSeries = [];
    var ySeries = [];
    var fSeries = [];
    var fSeriesError = [];
    var site;
    var species;
    
    data.features.forEach(function (attributes) {
        //errorMin = attributes.attributes.Mean-attributes.attributes.StandardError;
        //errorMax = attributes.attributes.Mean+attributes.attributes.StandardError;
       xSeries.push(attributes.attributes.SurveyYear); 
       ySeries.push(attributes.attributes.Mean);
       fSeries.push([attributes.attributes.SurveyYear, attributes.attributes.Mean]);
       fSeriesError.push([attributes.attributes.Mean-attributes.attributes.StandardError, attributes.attributes.Mean+attributes.attributes.StandardError]);
       //fSeriesError.push([errorMin, errorMax]);
        site = attributes.attributes.SiteName;
        species = attributes.attributes.SpeciesName;
    });
    
    console.log(fSeries);
    //console.log(fSeriesError);
    
    var hcChart = new Highcharts.chart({
        chart: {
            renderTo: renderTargets["1mQuadrat"] //'chartSiteSpecies1', // MUST HAVE THIS
            zoomType: 'xy'
            //type: 'spline'
            //type: 'scatter'
        },
        title: {
            text: queryAttributes.title["SampleSite"]//'Count per area (mean)'
        },
        subtitle: {
            text: '<I>' + species + '</I> at ' + site
        },
        xAxis: {
            title: {
                text: queryAttributes.xLabel["SampleSite"]//'Survey Year'
            },
            categories: xSeries

        },
        yAxis: {
            title: {
                text: queryAttributes.yLabel["SampleSite"]//'Density (count per area)'
            }, 
            style: {
                    color: Highcharts.getOptions().colors[0]
            }
        },
         tooltip: {
            shared: true
        },
//        legend: {
//            layout: 'vertical',
//            align: 'left',
//            verticalAlign: 'top',
//            x: 100,
//            y: 70,
//            floating: true,
//            backgroundColor: '#FFFFFF',
//            borderWidth: 1
//        },
 ////       plotOptions: {
////    scatter: {
//         marker: {
//             radius: 5,
//             states: {
//                 hover: {
//                     enabled: true,
//                     lineColor: 'rgb(100,100,100)'
//                 }
//             }
//         },
//         states: {
//             hover: {
//                 marker: {
//                     enabled: false
//                 }
//             }
//         },
////         tooltip: {
////             headerFormat: 'Year: <b>{point.x}</b><br/>',
 ////            pointFormat: '{point.y}'
 ////        },
////     }

 ////},
        series: [{
            name: 'count (mean)',
            type: 'line',
            data: ySeries,
            color: '#000000',
            tooltip: {
             headerFormat: 'Year: <b>{point.x}</b><br/>',
             pointFormat: '{point.y}<br/>'
            }
        }
        ,{
            name: 'count error',
            type: 'errorbar',
            data: fSeriesError,
            tooltip: {
                pointFormat: ' (error range: {point.low}-{point.high})<br/>'
            }
        }
        ]
    },
    
        //hcChart.renderTo("#chart");
        function(hcChart) {
            today = new Date().toLocaleFormat('%F');
            //today = new Date().toString('yyyymmdd');
            text = 'NPS Mediterranean Coast Network<br />Certification Status: Approved<br />Metadata URL<br />' + today;
            hcChart.renderer.text(text, 10, 350).css({color: '#999999', fontSize: '7pt', textAlign: 'center'}).attr({
                zIndex: 999}).add();
        });
    
}