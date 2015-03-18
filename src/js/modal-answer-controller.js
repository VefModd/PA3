angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance', 'evaluation', 'courseName', 'courseID', 'semester', 'dispatchModalAnswer',
    function ($scope, $modalInstance, evaluation, courseName, courseID, semester, dispatchModalAnswer) {
        $scope.evaluation = evaluation;
        $scope.courseName = courseName;
        $scope.courseID = courseID;
        $scope.semester = semester;

        dispatchModalAnswer.getTeachers($scope.courseID, $scope.semester).
            success(function(data) {
                $scope.teachers = data;

                for(var k = 0; k < $scope.teachers.length; k++) {
                    $scope.teachers[k].teacherQuestions = [];
                    for(var j = 0; j < $scope.evaluation.TeacherQuestions.length; j++) {
                        $scope.teachers[k].teacherQuestions[j] = {
                            ID : j,
                            question : $scope.evaluation.TeacherQuestions[j],
                            answers : []
                        };
                    }
                }
            }).
            error(function() {
            });

        $scope.courseQuestions = [];
        for(var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
            $scope.courseQuestions[i] = {
                ID : i,
                question : $scope.evaluation.CourseQuestions[i],
                answers: []
            };
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            console.log("inside finishEvaluation: ", $scope.answerEvaluationForm);
            if($scope.answerEvaluationForm.$valid) {

                $scope.result = {
                    CourseResult : $scope.courseQuestions,
                    TeacherResult : $scope.teachers
                };

                $modalInstance.close($scope.result);
            } else {
                // ERROR
            }
        };
    }]);
