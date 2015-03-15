angular.module('angularEvaluation').controller('ModalAnswerController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.answer = {
            "a": undefined,
            "b": undefined
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.answerEvaluationForm.$valid) {
                $modalInstance.close($scope.answer);
            }
        };
    }]);
