angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance', 'evaluation', 'courseName', 'courseID', 'semester', 'dispatchModalAnswer',
    function ($scope, $modalInstance, evaluation, courseName, courseID, semester, dispatchModalAnswer) {
        console.log("ModalAnswerController: evaluation=> ", evaluation);
        console.log("ModalAnswerController: courseName=> ", courseName);
        console.log("ModalAnswerController: courseID=> ", courseID);
        console.log("ModalAnswerController: semester=> ", semester);
        console.log("ModalAnswerController: evaluation.ID=> ", evaluation.ID);
        $scope.evaluation = evaluation;
        $scope.courseName = courseName;
        $scope.courseID = courseID;
        $scope.semester = semester;

        dispatchModalAnswer.getTeachers($scope.courseID, $scope.semester).
            success(function(data) {
                console.log("SUCCESS - getTeachers - data: ", data);
                $scope.teachers = data;
            }).
            error(function() {
                console.log("ERROR - getTeachers");
            });


        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.answerEvaluationForm.$valid) {
                console.log("answerEvaluation is valid!");
                console.log("scope.evaluation.teacherQ: ", $scope.evaluation);

                $scope.result = {
                    CourseResult : $scope.evaluation.CourseQuestions,
                    TeacherResult : $scope.evaluation.TeacherQuestions
                };

                $modalInstance.close($scope.result);
            } else {
                console.log("answerEvaluation is NOT valid!");
            }
        };
    }]);
