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
            console.log("answerEvaluationForm: ", scope.answerEvaluationForm);
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
                else if(scope.question.answers === undefined || scope.question.answers.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            };

            /*
            scope.updateValue = function(answer, question) {
                if(answer.checked) {
                    question.answers.push(answer.ID);
                } else {
                    var index = 0;
                    while(answer.ID !== question.answers[index]) {
                        index++;
                    }
                    question.answers.splice(index, 1);
                }
                console.log("inside updateValue: ", question.answers);
            };
            */

            //scope.firstAnswer = scope.question.question.Answers[0];
        }
    };
});
