angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance', 'evaluation', 'courseName', 'semester',
    function ($scope, $modalInstance, evaluation, courseName, semester) {
        $scope.answer = {
            "a": undefined,
            "b": undefined
        };

        console.log("ModalAnswerController: evaluation=> ", evaluation);
        console.log("ModalAnswerController: courseName=> ", courseName);
        console.log("ModalAnswerController: semester=> ", semester);
        console.log("ModalAnswerController: evaluation.ID=> ", evaluation.ID);

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.answerEvaluationForm.$valid) {
                $modalInstance.close($scope.answer);
            }
        };
    }]);
