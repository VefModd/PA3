angular.module('angularEvaluation').controller('ModalDateController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.date = {
            "startDate": undefined,
            "endDate": undefined
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finishEvaluation = function() {
            if($scope.newEvaluationForm.$valid) {
                $modalInstance.close($scope.date);
            }
        };
    }]);
