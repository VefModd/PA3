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

        $scope.finishTemplate = function() {
            console.log("Inside finish template function");
            if($scope.evaluationTemplate.CourseQuestions.length === 0 ||
                    $scope.evaluationTemplate.TeacherQuestions.length === 0) {
                if($scope.evaluationTemplate.CourseQuestions.length === 0) {
                    $scope.templateForm.courseQuestions.$invalid = true;
                }

                if($scope.evaluationTemplate.TeacherQuestions.length === 0) {
                    $scope.templateForm.teacherQuestions.$invalid = true;
                }
                $scope.templateForm.$valid = false;
            }
            else {
                $scope.templateForm.courseQuestions.$invalid = false;
                $scope.templateForm.teacherQuestions.$invalid = false;
                $scope.templateForm.$valid = true;
            }

            if($scope.templateForm.$valid) {
                console.log("The template is valid - add it to the database");
            }
        };

    }]);
