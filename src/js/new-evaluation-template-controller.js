angular.module('angularEvaluation').controller('NewEvaluationController', ['$scope', '$modal',
    function($scope, $modal) {
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
                templateUrl: 'src/html/modal-question.html',
                controller: 'ModalQuestionController',
                size: 'lg',
                resolve: {
                    typeOfQuestion : function() {
                        return 'courseQuestion';
                    }
                }
            });

            modalInstance.result.then(function(data) {
                $scope.evaluationTemplate.CourseQuestions.push(data);
                console.log("the evaluation template: ", $scope.evaluationTemplate);
            });
        };

        $scope.addTeacherQuestion = function() {
            var modalInstance = $modal.open({
                templateUrl: 'src/html/modal-question.html',
                controller: 'ModalQuestionController',
                size: 'lg',
                resolve: {
                    typeOfQuestion : function() {
                        return 'teacherQuestion';
                    }
                }
            });

            modalInstance.result.then(function(data) {
                $scope.evaluationTemplate.TeacherQuestions.push(data);
                console.log("the evaluation template: ", $scope.evaluationTemplate);
            });
        };

        $scope.test = function() {
            console.log("evaluationTemplate after adding something to it: ", $scope.evaluationTemplate);
        };

    }]);
