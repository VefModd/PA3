angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance', 'evaluation', 'courseName', 'courseID', 'semester', 'dispatchModalAnswer',
    function ($scope, $modalInstance, evaluation, courseName, courseID, semester, dispatchModalAnswer) {
        /*
        console.log("ModalAnswerController: evaluation=> ", evaluation);
        console.log("ModalAnswerController: courseName=> ", courseName);
        console.log("ModalAnswerController: courseID=> ", courseID);
        console.log("ModalAnswerController: semester=> ", semester);
        console.log("ModalAnswerController: evaluation.ID=> ", evaluation.ID);
        */
        $scope.evaluation = evaluation;
        $scope.courseName = courseName;
        $scope.courseID = courseID;
        $scope.semester = semester;

        dispatchModalAnswer.getTeachers($scope.courseID, $scope.semester).
            success(function(data) {
                console.log("SUCCESS - getTeachers - data: ", data);
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
                console.log("teachers: ", $scope.teachers);
            }).
            error(function() {
                console.log("ERROR - getTeachers");
            });

        $scope.courseQuestions = [];
        for(var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
            $scope.courseQuestions[i] = {
                ID : i,
                question : $scope.evaluation.CourseQuestions[i],
                answers: []
            };
        }
        console.log("$scope.evaluation.CourseQuestions: ", $scope.evaluation.CourseQuestions);
        console.log("$scope.evaluation.TeacherQuestions: ", $scope.evaluation.TeacherQuestions);
        console.log("$scope.courseQuestions: ", $scope.courseQuestions);


        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.answerEvaluationForm.$valid) {
                console.log("answerEvaluation is valid!");

                $scope.result = {
                    CourseResult : $scope.courseQuestions,
                    TeacherResult : $scope.teachers
                };

                $modalInstance.close($scope.result);
            } else {
                console.log("answerEvaluation is NOT valid!");
            }
        };
    }]);
