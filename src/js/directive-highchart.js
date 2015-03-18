angular.module("angularEvaluation").directive("highchart", function() {
    return {
        restrict: 'E',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-highchart.html',
        link: function(scope, element) {
            console.log("inside link function");
            console.log("question: ", scope.question);

            var chart = element.find('div');

            console.log("scope.chart: ", chart);
            chart.css('color', 'red');
            
            scope.data = [[]];

            var options = scope.question.OptionsResults;
            if(options) {
                for(var i = 0; i < options.length; i++) {
                    scope.data[0].push({ text : options[i].AnswerText, count : options[i].Count });
                }
            }

            console.log("data: ", scope.data);

            chart.highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: scope.question.Text
                },
                subtitle: {
                    text: 'Distribution of the answers'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                min: 0,
                    title: {
                        text: 'Number of students'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Number of students choosing this answer: <b>{point.y:.1f} students</b>'
                },
                series: [{
                    name: 'Population',
                    data: [
                    ],
                    /*
                    data: [
                        ['Shanghai', 23.7],
                        ['Lagos', 16.1],
                        ['Instanbul', 14.2],
                        ['Karachi', 14.0],
                        ['Mumbai', 12.5],
                        ['Moscow', 12.1],
                        ['SÃ£o Paulo', 11.8],
                        ['Beijing', 11.7],
                    ],
                    */
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                }]
            });


        }
    };
});
