angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            scope.answerEvaluationForm = answerEvaluationForm;
            scope.question.$$hashKey = scope.question.$$hashKey.replace(/:/, '');

            scope.requiredCheck = function() {
                if(attributes.isrequired === 'true') {
                    return true;
                } else {
                    return false;
                }
            };

            scope.isinValid = function() {
                if(!scope.requiredCheck()) {
                    return false;
                }
                else if(scope.question.answers === undefined ||
                        scope.question.answers.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            };

            //scope.firstAnswer = scope.question.question.Answers[0];
        }
    };
});
