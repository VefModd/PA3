angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel'
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            scope.question.Result = [];
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

            scope.id = scope.question.ID + "";

            if(attributes.typeofquestion === 'teacherQuestion') {
                scope.teacherid = attributes.teacher;
                scope.id += attributes.teacher;
            }

            scope.question.Result[scope.id] = {
                QuestionID : scope.question.ID,
                TeacherSSN : attributes.teacher,
                Value : []
            };

            console.log("ID: ", scope.id);

            /*
            if(scope.question.Type === 'multiple') {
                scope.question.Result[scope.id].Value = [];
            }
            */

            scope.updateValue = function(answer, id) {
                if(answer.checked) {
                    console.log("questoin: ", scope.question);
                    scope.question.Result[id].Value.push(answer.Text);
                    console.log("HEHE");
                } else {
                    console.log("HERE?");
                    var index = 0;
                    while(answer.Text !== scope.question.Result[id].Value[index]) {
                        index++;
                    }
                    scope.question.Result[id].Value.splice(index, 1);
                    console.log("HOT");
                }
                //console.log("inside updateValue: ", scope.question.Result[id].Value);

            };

            //console.log("the form: ", scope.answerEvaluationForm);
            //console.log("attributes: ", attributes);
            console.log("question: ", scope.question);
            /*
            scope.test = function() {
                console.log("question ", scope.question);
            };
            */
        }
    };
});
