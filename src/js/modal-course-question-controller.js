angular.module('angularEvaluation').controller('ModalCourseQuestionController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        var ans = {
            "Text": "blee",
            "Weight": 30
        };
        var ans2 = {
            "Text": "blee2",
            "Weight": 34
        };

        $scope.question = {
            "ID": 0,
            "Text": "",
            "TextEN": "",
            "ImageURL": null,
            "Type": "",
            "Answers": []
        };
        $scope.question.Answers.push(ans);
        $scope.question.Answers.push(ans2);

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

        $scope.addAnswer = function(answer) {
            $scope.showInputAnswer = false;
            $scope.question.Answers.push(answer);
            console.log("answer: ", answer);
            console.log("question: ", $scope.question);
            console.log("question.Answers: ", $scope.question.Answers);
        };

    }]);
