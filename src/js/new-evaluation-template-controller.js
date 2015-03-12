angular.module('angularEvaluation').controller('NewEvaluationController', ['$scope', '$modal',
    function($scope, $modal) {
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
    
        $scope.addCourseQuestion = function() {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalCourseQuestionController',
                size: 20
            });

            console.log("between stufff");
            /*
            modelInstance.result.then(function() {
                console.log("hothot");
            });
            */
        };

        console.log("evaluationTemplate before adding anything to is: ", $scope.evaluationTemplate);
        console.log("evaluationTemplate before adding anything to is: ", $scope.evaluationTemplate);

        $scope.test = function() {
            console.log("evaluationTemplate after adding something to it: ", $scope.evaluationTemplate);
        };

    }]);
