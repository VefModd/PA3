angular.module('angularEvaluation').controller('ModalNewEvaluationController', ['$scope', '$modalInstance',
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
                console.log("date: ", $scope.date);
                $modalInstance.close($scope.date);
            }
        };
    }]);
