angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatch',
        function($scope, $routeParams, $route, dispatch) {
            console.log("INSIDE STUDENT CONTROLLER!");
            dispatch.myCourses().
                success(function(data, status, headers, config) {
                    console.log("getCourses - SUCCESS!");
                    $scope.courses = data;
                }).
                error(function(data, status, headers, config) {
                    console.log("getCourses - ERROR!");
                });

            dispatch.myEvaluations().
                success(function(data, status, headers, config) {
                    console.log("getEvaluations - SUCCESS!");
                    $scope.evaluations = data;
                }).
                error(function(data, status, headers, config) {
                    console.log("getEvaluatoins - ERROR!");
                });
        }]);
