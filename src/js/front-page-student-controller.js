angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatch',
        function($scope, $routeParams, $route, dispatch) {
            dispatch.myCourses().
                success(function(data) {
                    console.log("getCourses - SUCCESS!");
                    $scope.courses = data;
                }).
                error(function() {
                    console.log("getCourses - ERROR!");
                });

            dispatch.myEvaluations().
                success(function(data) {
                    console.log("getEvaluations - SUCCESS!");
                    $scope.evaluations = data;
                }).
                error(function() {
                    console.log("getEvaluatoins - ERROR!");
                });
        }]);
