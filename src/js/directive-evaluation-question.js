angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel',
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            //console.log("INSIDE DIRECTIVE! => scope.question: ", scope.question);
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
                console.log("scope.question.answers: ", scope.question.answers.length);
                if(!scope.requiredCheck()) {
                    console.log("return false!");
                    return false;
                }

                if(scope.question.answers === undefined || scope.question.answers.length === 0) {
                    console.log("return true!");
                    return true;
                }
                else {
                    console.log("return false!");
                    return false;
                }



                /*
                var answer = scope.answerEvaluationForm[scope.question.$$hashKey];
                console.log("answer: ", answer);
                if(answer) {
                    console.log("scope.question: ", scope.question);
                    console.log("answer.$invalid: ", answer.$invalid);
                    if(answer.$invalid) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
                */
            };

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

            scope.test = function() {
                /*
                scope.validation = scope.question.$$hashKey;
                console.log("scope.validation: ", scope.validation);

                if(scope.question.answers !== undefined && scope.question.answers.length !== 0) {
                    console.log("YES");
                    console.log("scope.answerEvaluation.$setValidity: ", scope.answerEvaluationForm.$setValidity);
                    scope.answerEvaluationForm.$setValidity(scope.validation, true, scope.answerEvaluationFrom);
                }
                */

                //console.log("question ", scope.question);
                //console.log("answerEvaluationFrom: ", scope.answerEvaluationForm);

            };

        }
    };
});
