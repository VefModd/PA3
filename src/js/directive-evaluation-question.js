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

            /*
            scope.contains = function() {
                console.log("inside contains!");
                var returnObj = {
                    contains : false,
                    index : undefined
                };

                var ans = scope.answerEvaluationForm.$error.required;

                for(var i = 0; i < ans.length; i++) {
                    if(ans[i].$name === scope.question.$$hashKey) {
                        console.log("TRUE");
                        returnObj.contains = true;
                        returnObj.index = i;
                        return returnObj;
                    }
                }
                console.log("FALSE");
                return returnObj;
            };
            */
            
            /*
            scope.clickRadio = function() {
                console.log("inside click!");
                if(scope.question.answers.length !== 0) {

                    console.log("scope.answerEvaluationForm[scope.question.$$hashKey] ", scope.answerEvaluationForm[scope.question.$$hashKey]);
                    console.log("getErrors: ", scope.answerEvaluationForm.$error.required);

                    var contains = scope.contains();
                    console.log("contains: ", contains);
                    while(contains.contains) {
                        console.log("contains: ", contains);
                        scope.answerEvaluationForm.$error.required[contains.index].$valid = true;
                        scope.answerEvaluationForm.$error.required[contains.index].$invalid = false;
                        scope.answerEvaluationForm.$error.required.splice(1, contains.index);
                        contains = scope.contains();
                        console.log("after splice: contains: ", contains);
                        console.log(scope.answerEvaluationForm.$error.required);
                    }

                    scope.answerEvaluationForm[scope.question.$$hashKey].$valid = true;
                    scope.answerEvaluationForm[scope.question.$$hashKey].$invalid = false;
                }
            };
            */

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
            
            scope.firstAnswer = scope.question.question.Answers[0];

            /*
            scope.$watch('question.answers', function() {
                console.log("change!!");
                angular.forEach(scope.question.answers, function(value, index) {
                    console.log("flotT");
                    if(value) scope.answers
                });

            }, true);
            */

            scope.test = function() {

            };

        }
    };
});
