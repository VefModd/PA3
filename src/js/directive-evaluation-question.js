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
            //scope.question.Result = [];
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
            /*
            scope.id = scope.question.ID + "";

            if(attributes.typeofquestion === 'teacherQuestion') {
                scope.teacherid = attributes.teacher;
                scope.id += attributes.teacher;
            }
            */

            /*
            scope.question.Result[scope.id] = {
                QuestionID : scope.question.ID,
                TeacherSSN : attributes.teacher,
                Value : []
            };
            */

            //console.log("ID: ", scope.id);

            /*
            if(scope.question.Type === 'multiple') {
                scope.question.Result[scope.id].Value = [];
            }
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
