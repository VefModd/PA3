angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            // (scope, element, attributes)

            console.log("inside directive: ", answerEvaluationForm);
            scope.answerEvaluationForm = answerEvaluationForm;
            if(attributes.required) {
                scope.required = true;
            }
        }
    };
});
