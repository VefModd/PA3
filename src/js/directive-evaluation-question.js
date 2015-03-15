angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function() {
            // (scope, element, attributes)
        }
    };
});
