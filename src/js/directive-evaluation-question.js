angular.module("angularEvaluation").directive("evaluationQuestion", function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            question: '=ngModel'
        },
        templateUrl: 'src/html/directive-evaluation-question.html',
        link: function(scope, element, attributes, answerEvaluationForm) {
            scope.answerEvaluationForm = answerEvaluationForm;

            scope.requiredCheck = function() {
                if(attributes.isrequired === 'true') {
                    return true;
                } else {
                    return false;
                }
            };

            scope.id = scope.question.Text + scope.question.ID;

            if(attributes.typeofquestion === 'teacherQuestion') {
                scope.id += attributes.teacher;
            }

            scope.id = scope.id.replace(/ /g,'');
            console.log("ID: ", scope.id);
            scope.question.Answers.Value = [];
            scope.question.Answers.Value[scope.id] = undefined;

            if(scope.question.Type === 'multiple') {
                scope.question.Answers.Value[scope.id] = [];
            }

            scope.updateValue = function(answer, id) {
                if(answer.checked) {
                    scope.question.Answers.Value[id].push(answer.Text);
                } else {
                    var index = 0;
                    while(answer.Text !== scope.question.Answers.Value[id][index]) {
                        index++;
                    }
                    scope.question.Answers.Value[id].splice(index, 1);
                }
                console.log("inside updateValue: ", scope.question.Answers.Value[id]);

            };

            console.log("the form: ", scope.answerEvaluationForm);
            console.log("attributes: ", attributes);
        }
    };
});
