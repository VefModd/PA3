angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance', 'evaluation',
    function ($scope, $modalInstance, evaluation) {
        $scope.answer = {
            "a": undefined,
            "b": undefined
        };

        console.log("ModalAnswerController. evaluation=> ", evaluation);

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.answerEvaluationForm.$valid) {
                $modalInstance.close($scope.answer);
            }
        };
    }]);
