angular.module('angularEvaluation').controller('ModalResultController', ['$scope', '$modalInstance', 'results',
    function ($scope, $modalInstance, results) {
        console.log("inside modal result controller!");
        $scope.results = results;
        $scope.courses = $scope.results.Courses;
        console.log("$scop.courses: ", $scope.courses);
        console.log("results: ", $scope.results);
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
