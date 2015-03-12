angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location',
    function($scope, $routeParams, $route, $location) {
        $scope.newEvaluationTemplate = function() {
            $location.path('/new-evaluation-template');
        };
    }]);
