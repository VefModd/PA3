angular.module('angularEvaluation').controller('ModalCourseQuestionController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.question = {
            //"ID": 0,
            "Text": "",
            "TextEN": "",
            "ImageURL": null,
            "Type": "",
            "Answers": []
        };

        $scope.showInputAnswer = false;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finish = function () {
            $modalInstance.close($scope.question);
        };

        $scope.inputAnswer = function() {
            $scope.showInputAnswer = true;
        };

        $scope.addAnswer = function() {
            $scope.showInputAnswer = false;
            $scope.question.Answers.push($scope.answer);
            $scope.answer = "";
        };

    }]);
