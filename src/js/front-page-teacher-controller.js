angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', 'dispatch',
    function($scope, $routeParams, $route, $location, dispatch) {
        $scope.newEvaluationTemplate = function() {
            $location.path('/new-evaluation-template');
        };
    }]);
