angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel'
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, answerEvaluationForm) {
            console.log("INSIDE DIRECTIVE! => scope.question: ", scope.question);
            console.log("Hash key: ", scope.question.$$hashKey);
            //(scope, element, attributes, answerEvaluationForm)
            scope.answerEvaluationForm = answerEvaluationForm;

            /*
            scope.requiredCheck = function() {
                if(attributes.isrequired === 'true') {
                    return true;
                } else {
                    return false;
                }
            };
            */

            scope.updateValue = function(answer, question) {
                if(answer.checked) {
                    question.answers.push(answer.Text);
                } else {
                    var index = 0;
                    while(answer.Text !== question.answers[index]) {
                        index++;
                    }
                    question.answers.splice(index, 1);
                }
                console.log("inside updateValue: ", question.answers);
            };

            //console.log("the form: ", scope.answerEvaluationForm);
            //console.log("attributes: ", attributes);
            //console.log("question: ", scope.question);
            
            scope.test = function() {
                console.log("question ", scope.question);
            };
        }
    };
});
