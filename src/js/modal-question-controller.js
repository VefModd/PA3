angular.module('angularEvaluation').controller('ModalQuestionController', ['$scope', '$modalInstance', 'typeOfQuestion',
    function ($scope, $modalInstance, typeOfQuestion) {
        $scope.typeOfQuestion = typeOfQuestion;
        $scope.showInputAnswer = false;
        $scope.question = {
            //"ID": 0,
            "Text": "",
            "TextEN": "",
            "ImageURL": null,
            "Type": "",
            "Answers": []
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finish = function () {
            console.log("inside finish");
            if($scope.question.Type !== 'text' &&
                    $scope.question.Type !== 'single' &&
                    $scope.question.Type !== 'multiple') {
                $scope.newCourseQuestionForm.questionType.$invalid = true;
                $scope.newCourseQuestionForm.$valid = false;
            }
            else if(($scope.question.Type === 'single' ||
                     $scope.question.Type === 'multiple') &&
                     $scope.question.Answers.length === 0) {
                $scope.newCourseQuestionForm.questionAnswers.$invalid = true;
                $scope.newCourseQuestionForm.$valid = false;
            }
            else {
                $scope.newCourseQuestionForm.questionType.$invalid = false;
                $scope.newCourseQuestionForm.questionAnswers.$invalid = false;
                $scope.newCourseQuestionForm.$valid = true;
            }

            if($scope.newCourseQuestionForm.$valid) {
                if($scope.question.Type === 'text') {
                    $scope.question.Answers = [];
                }
                $modalInstance.close($scope.question);
            }
        };

        $scope.inputAnswer = function() {
            $scope.showInputAnswer = true;
        };

        $scope.addAnswer = function() {
            if($scope.answerForm.$valid) {
                $scope.showInputAnswer = false;
                $scope.question.Answers.push($scope.answer);
                $scope.answer = "";
                $scope.answerForm.$submitted = false;
                $scope.newCourseQuestionForm.questionAnswers.$invalid = false;
            }
        };

    }]);
