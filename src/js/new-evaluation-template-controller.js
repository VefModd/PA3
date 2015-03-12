angular.module('angularEvaluation').controller('NewEvaluationController', ['$scope', '$routeParams', '$route', 'dispatch',
    function($scope, $routeParams, $route, dispatch) {
        console.log("INSDIE NEW EVALUATION CONTROLLER!");
        $scope.evaluationTemplate = {
            "ID": 0,
            "Title": "",
            "TitleEN": "",
            "IntroText": "",
            "IntroTextEN": "",
            "CourseQuestions": [],
            "TeacherQuestions": []
        };

        console.log("evaluationTemplate before adding anything to is: ", $scope.evaluationTemplate);

        $scope.test = function() {
            console.log("evaluationTemplate after adding something to it: ", $scope.evaluationTemplate);
        };
    }]);
