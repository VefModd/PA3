angular.module('angularEvaluation').controller('NewEvaluationController', ['$scope', '$modal',
    function($scope, $modal) {
        console.log("INSDIE NEW EVALUATION CONTROLLER!");
        $scope.evaluationTemplate = {
            //"ID": 0,
            "Title": "",
            "TitleEN": "",
            "IntroText": "",
            "IntroTextEN": "",
            "CourseQuestions": [],
            "TeacherQuestions": []
        };
    
        $scope.addCourseQuestion = function() {
            var modalInstance = $modal.open({
                templateUrl: 'src/html/modal-course-question.html',
                controller: 'ModalCourseQuestionController',
                size: 'lg'
            });

            modalInstance.result.then(function(data) {
                $scope.evaluationTemplate.CourseQuestions.push(data);
            });
        };

        $scope.test = function() {
            console.log("evaluationTemplate after adding something to it: ", $scope.evaluationTemplate);
        };

    }]);
