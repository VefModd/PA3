angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatch',
        function($scope, $routeParams, $route, dispatch) {
            //$scope.getCourses = function() {
                dispatch.myCourses().
                    success(function(data, status, headers, config) {
                        console.log("getCourses - SUCCESS!");
                        $scope.courses = data;
                    }).
                    error(function(data, status, headers, config) {
                        console.log("getCourses - ERROR!");
                    });
            //}
        }]);
