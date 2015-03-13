angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatchStudent',
        function($scope, $routeParams, $route, dispatchStudent) {
            dispatchStudent.myCourses().
                success(function(data) {
                    console.log("getCourses - SUCCESS!");
                    $scope.courses = data;
                }).
                error(function() {
                    console.log("getCourses - ERROR!");
                });

            dispatchStudent.myEvaluations().
                success(function(data) {
                    console.log("getEvaluations - SUCCESS!");
                    $scope.evaluations = data;
                }).
                error(function() {
                    console.log("getEvaluatoins - ERROR!");
                });
        }]);
