angular.module('angularEvaluation').controller('ModalResultController', ['$scope', '$modalInstance', 'results',
    function ($scope, $modalInstance, results) {
        $scope.results = results;
        $scope.courses = $scope.results.Courses;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
