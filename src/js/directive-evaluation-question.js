angular.module("angularEvaluation").directive("evaluationQuestion", function($sce) {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel'
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            // (scope, element, attributes)
            // TODO answerEvaluationForm.{{ getName() }}.$invalid'
            scope.answerEvaluationForm = answerEvaluationForm;
            // get a unique indentifier
            scope.nameForValidation = scope.question.Text + scope.question.ID;
            scope.nameForValidation = $sce.trustAsHtml(scope.nameForValidation.replace(/ /g,''));
            scope.getName = function() {
                return scope.nameForValidation;
            };
            scope.requiredCheck = function() {
                if(attributes.isrequired === 'true') {
                    return true;
                } else {
                    return false;
                }
            };

            console.log("attributes.isrequired: ", attributes.isrequired);
            console.log("attributes: ", attributes);
            console.log("scope.nameForValidation: ", scope.nameForValidation);
            console.log("answerEvaluationFrom: ", scope.answerEvaluationForm);
        }
    };
});
