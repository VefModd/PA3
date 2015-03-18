angular.module("angularEvaluation").directive("highchart", function() {
    return {
        restrict: 'E',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-highchart.html',
        link: function(scope, element) {
            var chart = element.find('div');

            scope.data = [];

            var options = scope.question.OptionsResults;
            if(options) {
                for(var i = 0; i < options.length; i++) {
                    scope.data[[i]] = [];
                    scope.data[[i]].push(options[i].AnswerText, options[i].Count);
                }
            }

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
                    data: scope.data,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#000000',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: -30,
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
