angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', 'dispatch',
    function($scope, $routeParams, $route, dispatch) {
        $scope.newEvaluationTemplate = function() {
            $location.path('/newEvaluationTemplate');
        };
    }]);
