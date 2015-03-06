angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatch',
        function($scope, $routeParams, $route, dispatch) {
            $scope.studentUsername = $routeParams.studentUsername;
        }]);
