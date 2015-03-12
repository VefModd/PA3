angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', 'dispatch',
    function($scope, $routeParams, $route, dispatch) {
        console.log("INSIDE TEACHERS CONTROLLER!");
        $scope.newEvaluationTemplate = function() {
            console.log("creating a new template!");
        };
    }]);
