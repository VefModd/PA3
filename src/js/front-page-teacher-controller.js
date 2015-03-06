angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', 'dispatch',
        function($scope, $routeParams, $route, dispatch) {
            $scope.teacherUsernaem = $routeParams.teacherUsername;
        }]);
