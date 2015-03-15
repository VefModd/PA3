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

            scope.answerEvaluationForm = answerEvaluationForm;
            scope.nameForValidation = scope.question.Text + scope.question.ID;
            scope.nameForValidation = scope.nameForValidation.replace(/ /g,'');
            if(attributes.required) {
                scope.required = true;
            }
            console.log("validation string ", scope.nameForValidation);
            console.log("required? ", scope.required);
        }
    };
});
