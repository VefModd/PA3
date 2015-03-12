angular.module('angularEvaluation').controller('ModalCourseQuestionController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        var ans = {
            "Text": "blee",
            "Weight": 30
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
        $scope.question.Answers.push(ans);
        $scope.question.Answers.push(ans);

        $scope.showInputAnswer = false;

        console.log("the modal instance: ", $modalInstance);
        console.log("showInputAnswer: ", $scope.showInputAnswer);

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
            console.log("answer: ", answer);
            $scope.showInputAnswer = false;
            $scope.question.Answers.push(answer);
            console.log("question: ", $scope.question);
            console.log("question.Answer: ", $scope.question.Answers);
        };

    }]);
